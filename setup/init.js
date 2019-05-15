const mysql = require('mysql');

// Init
let connection = mysql.createConnection({
  host: 'localhost',
  port: '3306',
  user: 'root',
  password: 'root'
});

connection.connect(function (err) {
  if (err) throw err;

  connection.query("CREATE DATABASE IF NOT EXISTS matcha;", (err) => {
    if (err) throw err;
    console.log("Database created.");
    connection.end();
  })
});
