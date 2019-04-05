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
        "firstName VARCHAR(24), " +
        "lastName VARCHAR(50), " +
        "pwd VARCHAR(128), " +
        "salt VARCHAR(20));";
    connection.query(sql , (err, result) => {
        if (err) throw err;
        console.log("Result: " + result);
    })
    connection.end();
})
