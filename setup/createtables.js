const mysql = require('mysql');

let connection = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'root',
    database: 'matcha'
})

connection.connect(function(err) {
    if (err) throw err
    console.log('You are now connected...');

    const sql = "CREATE TABLE IF NOT EXISTS users (" +
        "id INT NOT NULL AUTO_INCREMENT PRIMARY KEY," +
        "login VARCHAR (24), " +
        "firstName VARCHAR(30), " +
        "lastName VARCHAR(30), " +
        "gender VARCHAR(8), " +
        "email VARCHAR(50), " +
        "pwd VARCHAR(128)); ";
    connection.query(sql , (err, result) => {
        if (err) throw err;
        console.log("Result: " + result);
    })
    connection.end();
})
