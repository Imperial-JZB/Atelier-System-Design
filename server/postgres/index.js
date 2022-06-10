require('dotenv').config();
const {Client} = require('pg');

const client = new Client({
  host: process.env.HOST,
  user: process.env.USERNAME,
  port: process.env.DB_PORT,
  password: process.env.PASSWORD,
  database: process.env.DATABASE
})

module.exports = client;