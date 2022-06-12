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
  post: async (req, res) => {
    try {
      const {
        body, name, email, product_id: productId,
      } = req.body;
      const bodyParams = {
        body, name, email, productId,
      };

      await model.questions.postQuestions(bodyParams);
      res.status(200).send({ success: 'Post was successful' });
    } catch (err) {
      res.status(400).send(err);
    }
  },
  updateHelpfulness: async (req, res) => {
    try {
      const questionId = Number(req.params.question_id);
      await model.questions.incrementHelpfulness(questionId);
      res.status(200).send({ success: 'Question has increased in helpfulness' });
    } catch (err) {
      res.status(400).send(err);
    }
  },
};
