const db = require('../postgres/');

module.exports = {
  products: function(callback) {
    db.query('SELECT * FROM products LIMIT 5', function(err, data) {
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
    db.query(`SELECT s.name, COALESCE(skus.skus, '{}') AS skus, COALESCE(photos.photos, '{}') AS photos     FROM styles s      LEFT JOIN LATERAL (       SELECT json_agg(json_build_object(         'id', skus.id,         'size', skus.size,         'quantity', skus.quantity       )) AS skus       FROM skus       WHERE styleId=${id}     ) skus ON true     LEFT JOIN LATERAL (       SELECT json_agg(json_build_object(         'thumbnail_url', photos.thumbnail_url,         'url', photos.url       )) AS photos       FROM photos       WHERE styleId=${id}     ) photos ON true     WHERE product_id=${id};`, function(err, data) {
    // db.query(`SELECT s.name, skus.size, skus.quantity FROM styles s INNER JOIN skus ON s.id = skus.styleID WHERE product_id=${id} AND styleId=${id};`, function(err, data) {
    // db.query(`SELECT id style_id, name, original_price, sale_price, default_style AS "default?" FROM styles WHERE product_id=${id}`, function(err, data) {
    // db.query(`SELECT id, thumbnail_url, url FROM photos  WHERE styleId=${id}`, function(err, data) {
      // db.query(`SELECT array_to_json(array_agg(row_to_json(photo))) FROM (SELECT id, thumbnail_url, url FROM photos WHERE styleId=${id}) AS photo`, function(err, data) {
      // db.query(`SELECT array_to_json(array_agg(row_to_json(sku))) FROM (SELECT size, quantity FROM skus WHERE styleId=${id}) AS sku`, function(err, data) {
        if (err) {
            console.log(err)
        } else {
            const productData = data.rows;
            callback(err, productData);
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