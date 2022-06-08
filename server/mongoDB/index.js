import mongoose from 'mongoose';
const { Schema } = mongoose;

//need to connect db

const meta = new Schema({
  product_id: String,
  ratings: {
    1: String,
    2: String,
    3: String,
    4: String,
    5: String
  },
  recommended: {
    false: String,
    true: String
  },
  characteristics: {
    Fit: {
      id: Number,
      value: String
    },
    Length: {
      id: Number,
      value: String
    },
    Comfort: {
      id: Number,
      value: String
    },
    Quality: {
      id: Number,
      value: String
    }
  },
});

const reviews = new Schema({
  product: String,
  page: Number,
  count: Number,
  results: [
    {
      review_id: Number,
      rating: String,
      summary: String,
      recommend: Boolean,
      body: String,
      date: String,
      reviewer_name: String,
      helpfulness: Number,
      photos: [
        {
          thumbnail_url: String,
          url: String
        }
      ]
    }
  ],

});


// module.exports = mongoose.model("user", UserScheme);