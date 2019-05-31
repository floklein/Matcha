const mysql = require('mysql');

// Init
let connection = mysql.createConnection({
  host: 'eu-cdbr-west-02.cleardb.net',
  port: '3306',
  user: 'bf02fec967e054',
  password: '4623bc9a',
});

connection.connect(function (err) {
  if (err) throw err;

  connection.query("CREATE DATABASE IF NOT EXISTS matcha;", (err) => {
    if (err) throw err;
    console.log("Database created.");
    connection.end();
  })
});
