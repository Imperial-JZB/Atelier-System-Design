const model = require('../models/products.js');

module.exports = {
  getAll: function (req, res) {
    const { page = 2, count = 2 } = req.query;
    model.products(page, count, (err, results) => {
      if (err) {
        res.sendStatus(404)
      } else {
        res.status(200).send(results.rows);
      }
    })
  },
  getById: function(req, res) {
    const id = req.params.product_id;
    model.productsById(id, (err, results) => {
      if (err) {
        res.sendStatus(404)
      } else {
        res.status(200).send(results);
      }
    })
  },
  getStyles: function(req, res) {
    const id = req.params.product_id;
    model.productStyles(id, (err, results) => {
      if (err) {
        res.sendStatus(404)
      } else {
        res.status(200).send(results);
      }
    })
  },
  getRelatedProducts: function(req, res) {
    const id = req.params.product_id;
    model.relatedProducts(id, (err, results) => {
      if (err) {
        res.sendStatus(404);
      } else {
        res.status(200).send(results);
      }
    })
  },
}

