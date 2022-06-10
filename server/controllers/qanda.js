const model = require('../models');

module.exports = {
  get: async (req, res) => {
    try {
      const { product_id: productId, page = 1, count = 5 } = req.query;
      const params = { productId, page, count };
      const { rows: results } = await model.qanda.fiveQuestions(params);

      res.status(200).send(results);
    } catch (err) {
      res.status(400).send(err);
    }
  },
};
