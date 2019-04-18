const mysql = require('mysql');

let connection = mysql.createConnection({
  host: 'localhost',
  port: '3306',
  user: 'root',
  password: 'root',
  database: 'matcha',
  multipleStatements: 'true'
})

connection.connect((err) => {
  if (err) throw err
  console.log('You are now connected...');

  const sql = "CREATE TABLE IF NOT EXISTS users (" +
    "id INT NOT NULL AUTO_INCREMENT PRIMARY KEY," +
    "username VARCHAR (24), " +
    "email VARCHAR(50), " +
    "password VARCHAR(128)); " +
    "" +
    "CREATE TABLE IF NOT EXISTS infos(" +
    "user_id INT NOT NULL, " +
    "gender VARCHAR(8), " +
    "age INT, " +
    "firstName VARCHAR(30), " +
    "lastName VARCHAR(30), " +
    "sexuality VARCHAR(20), " +
    "bio VARCHAR(460), " +
    "profile_pic VARCHAR(24), " +
    "popularity INT NOT NULL);" +
    "" +
    "CREATE TABLE IF NOT EXISTS verified(" +
    "user_id INT NOT NULL," +
    "code VARCHAR(36)," +
    "status BOOLEAN);" +
    "" +
    "CREATE TABLE IF NOT EXISTS blocks(" +
    "id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, " +
    "blocker_id INT NOT NULL, " +
    "blocked_id INT NOT NULL);" +
    "" +
    "CREATE TABLE IF NOT EXISTS likes(" +
    "id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, " +
    "liker_id INT NOT NULL, " +
    "liked_id INT NOT NULL); " +
    "" +
    "CREATE TABLE IF NOT EXISTS visit( " +
    "id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, " +
    "visiter_id INT NOT NULL, " +
    "visited_id INT NOT NULL, " +
    "`time` DATE NOT NULL);" +
    "" +
    "CREATE TABLE IF NOT EXISTS interests(" +
    "id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, " +
    "user_id int not NULL, " +
    "tag VARCHAR(24));";
  connection.query(sql, (err, result) => {
    if (err) throw err;
    console.log("Result: " + result);
  });
  connection.end();
});


