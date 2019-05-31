const mysql = require('mysql');

let sql_connection = mysql.createPool({
  connectionLimit: 5,
  host: 'eu-cdbr-west-02.cleardb.net',
  port: '3306',
  user: 'bf02fec967e054',
  password: '4623bc9a',
  database: 'heroku_13dc1576b26f0ef',
});

module.exports = sql_connection;