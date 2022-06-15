require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.HOST,
  user: process.env.USER,
  port: process.env.DEFAULTPORT,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  max: 50,
});

module.exports = pool;
