const db = require('../postgres/');

module.exports = {
  updateHelpful: function(callback, id) {
    db.query('UPDATE reviews SET helpfulness=(helpfulness + 1) WHERE id = $1', id, function(err, data) {
      if (err) {
        console.log(err);
      } else {
        callback(err, data);
      }
    })
  },

  updateReport: function(callback, id) {
    db.query('UPDATE reviews SET reported=true WHERE id = $1', id, function(err, data) {
      if (err) {
        console.log(err);
      } else {
        callback(err, data);
      }
    })
  },

  insertReview: function(callback) {
    db.query('INSERT INTO reviews ', function(err, data) {
      if (err) {
        console.log(err);
      } else {
        callback(err, data);
      }
    })
  },

  meta: function(callback, product_id) {
    db.query(`SELECT
    R.product_id,
    (SELECT json_object_agg(rating, rateCount)
      FROM (SELECT rating, COUNT(*) AS rateCount
      FROM reviews
      WHERE product_id = R.product_id
      GROUP BY rating ) AS x
    ) AS ratings,
    (SELECT json_object_agg(recommend, recCount)
      FROM (SELECT recommend, COUNT(*) AS recCount
      FROM reviews
      WHERE product_id = R.product_id
      GROUP BY recommend ) AS x
    ) AS recommended,
    (SELECT json_object_agg(name, json_build_object('id', characteristic_id, 'value', avgVal))
      FROM(SELECT name, characteristic_id, AVG(value) AS avgVal
      FROM characteristic_reviews
      INNER JOIN characteristics C ON C.id=characteristic_reviews.characteristic_id
      WHERE product_id = R.product_id
      GROUP BY name, characteristic_id) AS x
    ) AS characteristics
    FROM reviews R
    WHERE R.product_id=$1
    GROUP BY R.product_id`, [product_id], function(err, data) {
      if (err) {
        console.log(err);
      } else {
        callback(err, data);
      }
    })
  },

  reviews: function(callback, product_id, count, page) {
    db.query(`EXPLAIN (FORMAT JSON) SELECT R.*, array_to_json(RP2.url_array) AS url, TO_TIMESTAMP(R.date/1000)::date
    AS review_date FROM reviews R
    INNER JOIN (
    SELECT R.id, array_agg(json_build_object('id',RP.id, 'url', RP.url))
    AS url_array FROM reviews R INNER JOIN reviews_photos RP
    ON R.id = RP.review_id
    GROUP BY R.id
    ) RP2 on RP2.id = R.id
    WHERE R.product_id = $1
    LIMIT $2
    OFFSET $3
    `, [product_id, count, page], function(err, data) {
      if (err) {
        console.log(err);
      } else {
        callback(err, data);
      }
    })
  },

}