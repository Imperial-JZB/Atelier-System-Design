const db = require('../postgres/');

module.exports = {
  updateHelpful: function(callback) {
    db.query('UPDATE reviews SET helpfulness=(helpfulness + 1) WHERE id = $', function(err, data) {
      if (err) {
        console.log(err);
      } else {
        callback(err, data);
      }
    })
  },

  updateReport: function(callback) {
    db.query('UPDATE reviews SET reported=true WHERE id = $', function(err, data) {
      if (err) {
        console.log(err);
      } else {
        callback(err, data);
      }
    })
  },

}