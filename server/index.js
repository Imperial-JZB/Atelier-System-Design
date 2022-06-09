require('dotenv').config()
const express = require('express');
const client = require('./postgres/');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

const port = process.env.PORT
const PORT = port || 3000;

const controller = require('./controllers/index.js');

app.get('/hello', (req, res) => {
  res.send('Hello World!')
})

// Ratings and Reviews
app.put('/reviews/:review_id/helpful', controller.reviews.helpful);
app.put('/reviews/:review_id/report', controller.reviews.report);
app.post('/reviews', );
// app.get('/reviews/meta', );
// app.get('/reviews/', );

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});

client.connect();
