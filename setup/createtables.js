const mysql = require('mysql');

let connection = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'root',
    database: 'matcha',
    multipleStatements: 'true'
})

connection.connect( (err) => {
    if (err) throw err
    console.log('You are now connected...');

    const sql = "CREATE TABLE IF NOT EXISTS users (" +
        "id INT NOT NULL AUTO_INCREMENT PRIMARY KEY," +
        "login VARCHAR (24), " +
        "firstName VARCHAR(30), " +
        "lastName VARCHAR(30), " +
        "email VARCHAR(50), " +
        "pwd VARCHAR(128)); " +
        "" +
        "CREATE TABLE IF NOT EXISTS additional(" +
        "user_id INT NOT NULL, " +
        "gender VARCHAR(8), " +
        "sexuality VARCHAR(20), " +
        "bio VARCHAR(460), " +
        "profile_picture VARCHAR(24), " +
        "popularity INT NOT NULL);" +
        "" +
        "CREATE TABLE IF NOT EXISTS validation(" +
        "user_id INT NOT NULL," +
        "code VARCHAR(36)," +
        "validated BOOLEAN);" +
        "" +
        "CREATE TABLE IF NOT EXISTS blocks(" +
        "id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, " +
        "blocker_id INT NOT NULL, " +
        "blockee_id INT NOT NULL);" +
        "" +
        "CREATE TABLE IF NOT EXISTS likes(" +
        "id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, " +
        "liker_id INT NOT NULL, " +
        "likee_id INT NOT NULL);"
    connection.query(sql , (err, result) => {
        if (err) throw err;
        console.log("Result: " + result);
    })
    connection.end();
})
