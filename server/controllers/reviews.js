// const axios = require('axios');
const model = require('../models/reviews.js');
require("dotenv").config();

module.exports = {
  put: function (req, res) {
    model.updateHelpful((err, results) => {
      if (err) {
        res.sendStatus(404)
      } else {
        res.status(200).send(results.rows);
      }
    })
  },
}