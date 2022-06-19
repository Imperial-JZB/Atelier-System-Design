const db = require('../../postgres');

module.exports = {
  getAnswers: async ({ questionId, page, count }) => {
    let offset;
    if (page > 0) {
      offset = (page - 1) * count;
    }

    const newPage = page - 1;

    const queryString = `
      SELECT
      $1 AS question,
      $2 :: int AS page,
      $3 :: int AS count,
      (
        SELECT
          json_agg (
            json_build_object (
              'answer_id',
              a.answer_id,
              'body',
              a.body,
              'date',
              (
                to_char(
                  to_timestamp(a.date / 1000),
                  'yyyy-MM-dd"T"00:00:00.000Z'
                )
              ),
              'answerer_name',
              a.answerer_name,
              'helpfulness',
              a.helpfulness,
              'photos',
              (
                SELECT
                  json_agg (
                    json_build_object (
                      'id', ap.answer_photos_id, 'url',
                      ap.url
                    )
                  )
                FROM
                  answer_photos as ap
                WHERE
                  answer_id = a.answer_id
              )
            )
          ) as results
        FROM
          answers AS a
        WHERE
          question_id = $4
          AND reported = 0
        GROUP BY
          a.question_id
      ) OFFSET $5
    LIMIT
      5
    `;

    return db.query(queryString, [questionId, newPage, count, questionId, offset]);
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
// SELECT to_timestamp(cast(q.question_date/1000 as bigint))::date

// const mvQueryString = `
// SELECT q.question_id::int8 AS question, ${newPage} AS page, ${count} AS count, q.results
// FROM mv_question as q
// WHERE question_id = $1
// OFFSET $2
// LIMIT $3
// `;