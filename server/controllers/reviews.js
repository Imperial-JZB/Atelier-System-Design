// const axios = require('axios');
const model = require('../models/reviews.js');
require("dotenv").config();

module.exports = {
  helpful: function (req, res) {
    model.updateHelpful((err, results) => {
      console.log(req.body)
      if (err) {
        res.sendStatus(404);
      } else {
        res.status(201).send('UPDATED');
      }
    })
  },

  report: function (req, res) {
    model.updateReport((err, results) => {
      if (err) {
        res.sendStatus(404);
      } else {
        res.status(201).send('UPDATED');
      }
    })
  },

  addReview: function (req, res) {
    model.addReview((err, results) => {
      if (err) {
        res.sendStatus(404);
      } else {
        res.status(201).send('Posted')
      }
    })
  }

}