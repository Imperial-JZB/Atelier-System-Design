const model = require('../models/products.js');

// GET /products/
// GET /products/:product_id
// GET /products/:product_id/styles
// GET /products/:product_id/related
console.log({model});
module.exports = {
  getAll: function (req, res) {
    model.products((err, results) => {
      if (err) {
        res.sendStatus(404)
      } else {
        res.status(200).send(results.rows);
      }
    })
  },
  // getById: function (req, res) {
  //   console.log(req.params.product_id)
  //   res.sendStatus(204)
  // },
  testProductsById: function(req, res) {
    model.productsById(1, (err, results) => {
      if (err) {
        res.sendStatus(404)
      } else {
        res.status(200).send(results);
      }
    })
  },
  testProductsByStyle: function(req, res) {
    model.productStyles(1, (err, results) => {
      if (err) {
        res.sendStatus(404)
      } else {
        res.status(200).send(results);
      }
    })
  },
  testRelatedProducts: function(req, res) {
    model.relatedProducts(1, (err, results) => {
      if (err) {
        res.sendStatus(404);
      } else {
        res.status(200).send(results);
      }
    })
  },
}

