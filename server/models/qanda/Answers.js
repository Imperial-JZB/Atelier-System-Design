const db = require('../../postgres');

module.exports = {
  getAnswers: async ({ questionId, page, count }) => {
    // const offset = (page - 1) * count;

    // const queryString = `
    // SELECT q.question_id, q.question_body, q.question_date, q.asker_name, q.question_helpfulness, q.reported,
    //   (SELECT json_object_agg(a.answer_id,
    //     json_build_object (
    //       'id', a.answer_id,
    //       'body', a.body,
    //       'date', a.date,
    //       'answerer_name', a.answerer_name,
    //       'helpfulness', a.helpfulness,
    //       'photos', (SELECT json_agg (
    //         json_build_object (
    //           'id', ap.answer_photos_id,
    //           'url', ap.url
    //         )
    //       )
    //   FROM answer_photos AS ap
    //   WHERE answer_id = a.answer_id ))) as answers
    // FROM answers AS a
    // WHERE question_id = q.question_id
    // )
    // FROM questions AS q
    // WHERE product_id = $1
    // LIMIT $2
    // OFFSET $3`;

    // return db.query(queryString);
  },
};
