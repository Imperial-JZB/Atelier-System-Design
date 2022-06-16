require('dotenv').config();
const express = require('express');
const path = require('path');
const client = require('./postgres');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));

const port = process.env.PORT;
const PORT = port || 3000;

const controller = require('./controllers/index');

app.get('/hello', (req, res) => {
  res.send('Hello World!');
});

// product Routes
app.get('/products', controller.products.getAll);
app.get('/products/:product_id', controller.products.getById);
app.get('/products/:product_id/styles', controller.products.getStyles);
app.get('/products/:product_id/related', controller.products.getRelatedProducts);

// Ratings and Reviews
app.put('/reviews/:review_id/helpful', controller.reviews.helpful);
app.put('/reviews/:review_id/report', controller.reviews.report);

app.get('/reviews/meta', controller.reviews.getMeta);
app.get('/reviews/', controller.reviews.getReviews);

// Q and A Routes

// Questions
app.get('/qa/questions', controller.questions.get);
app.post('/qa/questions', controller.questions.post);
app.put('/qa/questions/:question_id/helpful', controller.questions.updateHelpfulness);
app.put('/qa/questions/:question_id/report', controller.questions.report);

// Answers
app.get('/qa/questions/:question_id/answers', controller.answers.get);
app.post('/qa/questions/:question_id/answers', controller.answers.post);
app.put('/qa/answers/:answer_id/helpful', controller.answers.updateAnsHelpfulness);
app.put('/qa/answers/:answer_id/report', controller.answers.report);

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});

client.connect((err) => {
  if (err) {
    console.error('connection error', err.stack);
  } else {
    console.log('Database Connected');
  }
});
