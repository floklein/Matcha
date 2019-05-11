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
    "sexuality VARCHAR(20) DEFAULT 'bisexual', " +
    "bio VARCHAR(460), " +
    "profile_pic VARCHAR(256) DEFAULT '/photos/default.png', " +
    "popularity INT NOT NULL," +
    "latitude FLOAT(12,8), " +
    "longitude FLOAT(12,8), " +
    "address_modified BOOLEAN DEFAULT 0);" +
    "" +
    "CREATE TABLE IF NOT EXISTS verified(" +
    "user_id INT NOT NULL," +
    "code VARCHAR(36)," +
    "status BOOLEAN);" +
    "" +
    "CREATE TABLE IF NOT EXISTS blocks(" +
    "id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, " +
    "blocker_id INT NOT NULL, " +
    "blocked_id INT NOT NULL); " +
    "" +
    "CREATE TABLE IF NOT EXISTS reports(" +
    "id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, " +
    "reported_id INT NOT NULL, " +
    "reporter_id INT NOT NULL); " +
    "" +
    "CREATE TABLE IF NOT EXISTS likes(" +
    "id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, " +
    "liker_id INT NOT NULL, " +
    "liked_id INT NOT NULL); " +
    "" +
    "CREATE TABLE IF NOT EXISTS dislikes(" +
    "id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, " +
    "disliker_id INT NOT NULL, " +
    "disliked_id INT NOT NULL); " +
    "" +
    "CREATE TABLE IF NOT EXISTS connection(" +
    "user_id INT NOT NULL, " +
    "connected BOOLEAN DEFAULT 0, " +
    "last_connection DATETIME); " +
    "" +
    "CREATE TABLE IF NOT EXISTS visits( " +
    "id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, " +
    "visiter_id INT NOT NULL, " +
    "visited_id INT NOT NULL, " +
    "`time` DATETIME NOT NULL);" +
    "" +
    "CREATE TABLE IF NOT EXISTS photos(" +
    "user_id INT NOT NULL, " +
    "pic1 VARCHAR(256), " +
    "pic2 VARCHAR(256), " +
    "pic3 VARCHAR(256), " +
    "pic4 VARCHAR(256), " +
    "pic5 VARCHAR(256)); "+
    "" +
    "CREATE TABLE IF NOT EXISTS messages(" +
    "id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, " +
    "sender_id INT NOT NULL, " +
    "receiver_id INT NOT NULL, " +
    "message VARCHAR(256) NOT NULL, " +
    "`time` DATETIME NOT NULL); " +
    "" +
    "CREATE TABLE IF NOT EXISTS settings(" +
    "`user_id` INT NOT NULL, " +
    "`visit` BOOLEAN DEFAULT 1, " +
    "`like` BOOLEAN DEFAULT 1, " +
    "`unliked` BOOLEAN DEFAULT 1, " +
    "`match` BOOLEAN DEFAULT 1, " +
    "`message` BOOLEAN DEFAULT 1); " +
    "" +
    "CREATE TABLE IF NOT EXISTS notifs(" +
    "id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, " +
    "user_id INT NOT NULL, " +
    "notifier_name VARCHAR(24), " +
    "type VARCHAR(12) NOT NULL, " +
    "content VARCHAR(64) NOT NULL, " +
    "`time` DATETIME NOT NULL, " +
    "`read` BOOLEAN DEFAULT 0); " +
    "" +
    "CREATE TABLE IF NOT EXISTS interests(" +
    "id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, " +
    "user_id int not NULL, " +
    "tag VARCHAR(24));";
  connection.query(sql, (err, result) => {
    if (err) throw err;
    console.log('Tables created: ' + result + '.');
  });
  connection.end();
});
