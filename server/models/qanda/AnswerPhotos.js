const db = require('../../postgres');

module.exports = {
  postAnswerPhotos: ({ answerId, url }) => {
    const queryString = `
    INSERT INTO answer_photos (answer_id, url, answer_photos_id)
    VALUES ($1, $2,
      (SELECT setval('answer_photos_answer_photos_id_seq',
      (SELECT MAX(answer_photos_id + 1) FROM "answer_photos")
    ))
  )
    `;
    // depending on how many urls are in the array, we call this query that many times
    return db.query(queryString, [answerId, url]);
  },
};
