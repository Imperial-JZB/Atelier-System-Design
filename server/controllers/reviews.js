// const axios = require('axios');
const model = require('../models/reviews.js');
require("dotenv").config();

module.exports = {
  helpful: function (req, res) {
    const id = [req.params.review_id];
    console.log(id)
    model.updateHelpful((err, results) => {
      if (err) {
        res.sendStatus(404);
      } else {
        res.status(201).send('UPDATED');
      }
    }, id)
  },

  report: function (req, res) {
    const id = [req.params.review_id];
    model.updateReport((err, results) => {
      if (err) {
        res.sendStatus(404);
      } else {
        res.status(201).send('UPDATED');
      }
    }, id)
  },

  addReview: function (req, res) {
    model.addReview((err, results) => {
      if (err) {
        res.sendStatus(404);
      } else {
        res.status(201).send('Posted')
      }
    })
  },

  getMeta: function(req, res) {
    const product_id = Number(req.query.product_id);
    model.meta((err, results) => {
      if (err) {
        res.sendStatus(404);
      } else {
        res.status(201).send(results.rows);
      }
    }, product_id)
  },

  getReviews: function(req, res) {
    const config = {
      product_id: Number(req.query.product_id),
      count: req.query.count,
      page: ((req.query.page - 1) * req.query.count),
    }

    model.reviews((err, results) => {
      if (err) {
        res.sendStatus(404);
      } else {
        res.status(201).send(results.rows)
      }
    }, config.product_id, config.count, config.page)
  },

}