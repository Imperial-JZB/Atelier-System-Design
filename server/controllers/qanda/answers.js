const model = require('../../models');

module.exports = {
  get: async (req, res) => {
    try {
      const { page = 1, count = 5 } = req.query;
      const { question_id: questionId } = req.params;

      const params = { questionId, page, count };
      const { rows: results } = await model.answers.getAnswers(params);

      const resultsAnswers = {
        question: questionId, page: page - 1, count, results: results[0].results,
      };
      res.status(200).send(resultsAnswers);
    } catch (err) {
      res.status(400).send(err);
    }
  },
};
