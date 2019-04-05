const express = require('express');

const mysql = require('mysql');
const app = express();
const nodeadmin = require('nodeadmin');
const crypto = require('crypto');
const pw_hash = require('password-hash');

let connection = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'root',
    database: 'matcha'
})

connection.connect(function(err) {
    if (err) throw err
    console.log('You are now connected...')
})

app.use(nodeadmin(app));

app.post('/api/login', (req, res) => {
    let response = {
        email : req.query.email,
        login : req.query.login,
        firstName : req.query.firstname,
        lastName : req.query.lastname,
        gender : req.query.gender,
        password : req.query.password,
        re_pw : req.query.confirm
    }

    let hashed_pw = pw_hash.generate(response.password);

    const sql = "INSERT INTO users(login, firstName, lastName, gender, email, pwd) " +
        `VALUES("${response.login}", "${response.firstName}", "${response.lastName}", "${response.gender}", "${response.email}", "${hashed_pw}");`;

     connection.query(sql , (err, result) => {
         if (err) throw err;
         console.log("Result: " + result);
     })
});


const port = 5000;

app.listen(port, () => `Server running on port ${port}`);