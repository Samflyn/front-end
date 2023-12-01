const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'node',
}); //instead of creating connection every time

module.exports = pool.promise();
