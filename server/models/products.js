const db = require('../postgres/');

module.exports = {
  products: function(page, count, callback) {
    db.query(`SELECT * FROM products WHERE id>=${((page-1)*count)+1} LIMIT ${count}`, function(err, data) {
      if (err) {
        console.log(err)
      } else {
        callback(err, data);
      }
    })
  },
  productsById: function(id, callback) {
    db.query(`SELECT * FROM products WHERE id=${id}`, function(err, data) {
        if (err) {
            console.log(err)
        } else {
            const productData =  data.rows[0];
            db.query(`SELECT feature,value FROM features WHERE product_id=${id}`, function(err, features) {
                if (err) {
                    console.log(err)
                    callback(err, productData);
                } else {
                    productData.features= features.rows;
                    callback(err, productData);
                }
            })
        }
    })
  },
  productStyles: function(id, callback) {
    db.query(`
      SELECT id style_id, s.name, name, original_price, sale_price, default_style AS "default?" , COALESCE(skus.skus, '{}') AS skus, COALESCE(photos.photos, '{}') AS photos
      FROM styles s      
      LEFT JOIN LATERAL (       
        SELECT json_agg(json_build_object(         
          'thumbnail_url', photos.thumbnail_url,         
          'url', photos.url       
        )) AS photos       
        FROM photos       
        WHERE styleId=${id}     
      ) photos ON true     
      LEFT JOIN LATERAL (       
        SELECT json_object_agg( 
          skus.id,
          json_build_object(       
            'size', skus.size,         
            'quantity', skus.quantity       
          )
        ) AS skus       
        FROM skus       
        WHERE styleId=${id}   
      ) skus ON true     
      WHERE product_id=${id};`, function(err, data) {
        if (err) {
            console.log(err)
        } else {
            if(data.rows) {
            const productData = data.rows;
            const result = { product_id: id, results: productData}
            callback(err, result);
            } else {
              callback(err, data);
            }
            
        }
    })
  },
  relatedProducts: function(id, callback) {
    db.query(`SELECT ARRAY_AGG (related_product_id) FROM related  WHERE current_product_id=${id} GROUP BY current_product_id`, function(err, data) {
        if (err) {
            console.log(err);
        } else {
            const productData =  data.rows[0].array_agg;
            callback(err, productData);
        }
    })
  },
}