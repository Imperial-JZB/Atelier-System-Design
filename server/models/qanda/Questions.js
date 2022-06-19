const db = require('../../postgres');

module.exports = {
  getQuestions: ({ productId, page, count }) => {
    let offset;
    if (page > 0) {
      offset = (page - 1) * count;
    }

    const queryString = `
      SELECT
        Q.PRODUCT_ID,
        (
          SELECT
            JSON_AGG (
              JSON_BUILD_OBJECT (
                'question_id',
                Q.QUESTION_ID,
                'question_body',
                Q.QUESTION_BODY,
                'question_date',
                (
                  TO_CHAR(
                    TO_TIMESTAMP(Q.QUESTION_DATE / 1000),
                    'yyyy-MM-dd"T"00:00:00.000Z'
                  )
                ),
                'asker_name',
                Q.ASKER_NAME,
                'question_helpfulness',
                Q.QUESTION_HELPFULNESS,
                'reported',
                Q.REPORTED :: boolean,
                'answers',
                (
                  SELECT
                    JSON_OBJECT_AGG(
                      A.ANSWER_ID,
                      JSON_BUILD_OBJECT (
                        'id',
                        A.ANSWER_ID,
                        'body',
                        A.BODY,
                        'date',
                        (
                          TO_CHAR(
                            TO_TIMESTAMP(A.DATE / 1000),
                            'yyyy-MM-dd"T"00:00:00.000Z'
                          )
                        ),
                        'answerer_name',
                        A.ANSWERER_NAME,
                        'helpfulness',
                        A.HELPFULNESS,
                        'photos',
                        (
                          SELECT
                            ARRAY_AGG (AP.URL)
                          FROM
                            ANSWER_PHOTOS AS AP
                          WHERE
                            ANSWER_ID = A.ANSWER_ID
                        )
                      )
                    ) AS ANSWERS
                  FROM
                    ANSWERS AS A
                  WHERE
                    QUESTION_ID = Q.QUESTION_ID
                )
              )
            )
        ) AS RESULTS
      FROM
        QUESTIONS AS Q
      WHERE
        PRODUCT_ID = $1
        AND REPORTED = 0
      GROUP BY
        Q.PRODUCT_ID
      LIMIT
        $2 OFFSET $3
      `;

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
