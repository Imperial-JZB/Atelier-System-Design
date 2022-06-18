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
  post: async (req, res) => {
    try {
      const {
        body, name, email, photos,
      } = req.body;
      const questionId = Number(req.params.question_id);
      const bodyParams = {
        body, name, email, questionId,
      };

      const { rows: results } = await model.answers.postAnswer(bodyParams);
      const answerId = results[0].answer_id;

      const photosQuery = photos.map((url) =>
        model.answerPhotos.postAnswerPhotos({ answerId, url }));

      await Promise.all(photosQuery);

      res.status(201).send({ success: 'Post was made succesfully' });
    } catch (err) {
      res.status(400).send(err);
    }
  },
  updateAnsHelpfulness: async (req, res) => {
    try {
      const answerId = Number(req.params.answer_id);
      await model.answers.incrementAnsHelpfulness(answerId);
      res.status(200).send({ success: 'Answer has increased in helpfulness' });
    } catch (err) {
      res.status(400).send(err);
    }
  },
  report: async (req, res) => {
    try {
      const answerId = Number(req.params.answer_id);
      await model.answers.reportAns(answerId);
      res.status(200).send({ success: 'Answer has been reported' });
    } catch (err) {
      res.status(400).send(err);
    }
  },
};
