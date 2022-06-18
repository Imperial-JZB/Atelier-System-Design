const db = require('../../postgres');

module.exports = {
  getQuestions: ({ productId, page, count }) => {
    let offset;
    if (page > 0) {
      offset = (page - 1) * count;
    }

    const queryString = `
    SELECT q.product_id,
    (
      SELECT json_agg (
      json_build_object (
      'question_id', q.question_id,
      'question_body', q.question_body,
      'question_date',(to_char(to_timestamp(q.question_date / 1000), 'yyyy-MM-dd"T"00:00:00.000Z')),
      'asker_name', q.asker_name,
      'question_helpfulness', q.question_helpfulness,
      'reported', q.reported::boolean,
        'answers', (SELECT json_object_agg(a.answer_id,
          json_build_object (
            'id', a.answer_id,
            'body', a.body,
            'date', (to_char(to_timestamp(a.date / 1000), 'yyyy-MM-dd"T"00:00:00.000Z')),
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
      WHERE product_id = $1 AND reported = 0
      GROUP BY q.product_id
      LIMIT $2
      OFFSET $3`;

    // We are in the questions table, where theres a unique question so just one of
    // each but multiple ones with the same product id, and we want to find
    // info about a certain product_id, so we have to group
    // Show the product_id column, and do an aggregate function WHERE product_id = $1
    return db.query(queryString, [productId, count, offset]);
  },
  postQuestions: ({ body, name, email, productId }) => {
    const queryString = `
    INSERT INTO questions
    (question_body, asker_name, asker_email, product_id, question_id)
    VALUES ($1, $2, $3, $4,
      (SELECT setval('questions_question_id_seq',
      (SELECT MAX(question_id + 1) FROM "questions")
      ))
     )
    `;
    return db.query(queryString, [body, name, email, productId]);
  },
  incrementHelpfulness: (questionId) => {
    const queryString = `
    UPDATE questions
      SET question_helpfulness = question_helpfulness + 1
    WHERE question_id = $1
    `;
    return db.query(queryString, [questionId]);
  },
  reportQuestion: (questionId) => {
    const queryString = `
    UPDATE questions
      SET reported = reported + 1
    WHERE question_id = $1
    `;
    return db.query(queryString, [questionId]);
  },

};
