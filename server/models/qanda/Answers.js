const db = require('../../postgres');

module.exports = {
  getAnswers: async ({ questionId, page, count }) => {
    const offset = (page - 1) * count;

    const queryString = `
    SELECT json_agg (
      json_build_object (
        'answer_id', a.answer_id,
        'body', a.body,
        'date', a.date,
        'answerer_name', a.answerer_name,
        'helpfulness', a.helpfulness,
        'photos', (SELECT json_agg (
          json_build_object (
            'id', ap.answer_photos_id,
            'url', ap.url
          ))
          FROM answer_photos as ap
          WHERE answer_id = a.answer_id AND reported < 1
            )
          )
        ) as results
    FROM answers AS a
    WHERE question_id = 1
    GROUP BY a.question_id
    `;

    return db.query(queryString, [questionId, offset, count]);
  },
};
//a.question_id