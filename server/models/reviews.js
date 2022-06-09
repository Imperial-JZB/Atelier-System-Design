const db = require('../postgres/');

module.exports = {
  updateHelpful: function(callback) {
    db.query('SELECT * FROM reviews LIMIT 5', function(err, data) {
      if (err) {
        console.log(err)
      } else {
        callback(err, data);
      }
    })
  }
}