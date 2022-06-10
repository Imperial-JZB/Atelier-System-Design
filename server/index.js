require('dotenv').config();
const express = require('express');
const client = require('./postgres');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT;
const PORT = port || 3000;

const controller = require('./controllers/index');

app.get('/hello', (req, res) => {
  res.send('Hello World!');
});

app.put('/reviews', controller.reviews.put);

app.get('/qa/questions', controller.qanda.get);

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
