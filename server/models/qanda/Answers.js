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
    WHERE question_id = $1
    GROUP BY a.question_id
    OFFSET $2
    LIMIT $3
    `;

    return db.query(queryString, [questionId, offset, count]);
  },
  postAnswer: ({ questionId, body, name, email }) => {
    const queryString = `
      INSERT INTO answers (question_id, body, answerer_name, answerer_email, answer_id)
      VALUES ($1, $2, $3, $4,
        (SELECT setval('answers_answer_id_seq',
        (SELECT MAX(answer_id + 1) FROM "answers")
      ))
    ) RETURNING answer_id
    `;

    return db.query(queryString, [questionId, body, name, email]);
  },
  incrementAnsHelpfulness: (answerId) => {
    const queryString = `
    UPDATE answers
      SET helpfulness = helpfulness + 1
    WHERE answer_id = $1
    `;
    return db.query(queryString, [answerId]);
  },
  reportAns: (answerId) => {
    const queryString = `
    UPDATE answers
      SET reported = reported + 1
    WHERE answer_id = $1
    `;
    return db.query(queryString, [answerId]);
  },
};
// answer_id SERIAL PRIMARY KEY,
// question_id INT NOT NULL,
// body TEXT,
// date VARCHAR(20),
// answerer_name VARCHAR(50),
// answerer_email VARCHAR(50),
// reported INT DEFAULT 0,
// helpfulness INT DEFAULT 0,
// FOREIGN KEY(question_id) references questions(question_id)