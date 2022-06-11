const db = require('../../postgres');

module.exports = {
  getQuestions: async ({ productId, page, count }) => {
    const offset = (page - 1) * count;

    const queryString = `
    SELECT q.product_id,
    (
      SELECT json_agg (
      json_build_object (
      'question_id', q.question_id,
      'question_body', q.question_body,
      'question_date', q.question_date,
      'asker_name', q.asker_name,
      'question_helpfulness', q.question_helpfulness,
      'reported', q.reported,
      'answers', (SELECT json_object_agg(a.answer_id,
        json_build_object (
          'id', a.answer_id,
          'body', a.body,
          'date', a.date,
          'answerer_name', a.answerer_name,
          'helpfulness', a.helpfulness,
          'photos', (SELECT array_agg (ap.url)
        FROM answer_photos AS ap
        WHERE answer_id = a.answer_id ))) as answers
        FROM answers AS a
        WHERE question_id = q.question_id
        )
       )
      )) as results
      FROM questions AS q
      WHERE product_id = $1
      GROUP BY q.product_id
      LIMIT $2
      OFFSET $3`;
    // We are in the questions table, where theres a unique question so just one of
    // each but multiple ones with the same product id, and we want to find
    // info about a certain product_id, so we have to group
    // Show the product_id column, and do an aggregate function WHERE product_id = $1
    return db.query(queryString, [productId, count, offset]);
  },
};
