const model = require('../../models');

module.exports = {
  get: async (req, res) => {
    try {
      const { product_id: productId, page = 1, count = 5 } = req.query;
      const params = { productId, page, count };
      const { rows: results } = await model.questions.getQuestions(params);

      // Mutating reported output to be a boolean
      results[0].results[0].reported = !!results[0].results[0].reported;
      res.status(200).send(results[0]);
    } catch (err) {
      res.status(400).send(err);
    }
  },
};