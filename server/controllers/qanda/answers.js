const model = require('../../models');

module.exports = {
  get: async (req, res) => {
    try {
      const { page = 1, count = 5 } = req.query;
      const { question_id: questionId } = req.params;
      const params = { questionId, page, count };
      const { rows: results } = await model.answers.getAnswers(params);

      res.status(200).send(results[0]);
    } catch (err) {
      res.status(400).send(err);
    }
  },
};
