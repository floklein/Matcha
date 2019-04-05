const express = require('express');

const mysql = require('mysql');
const app = express();
const nodeadmin = require('nodeadmin');
const crypto = require('crypto'); //a remplacer par bcrypt
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

app.post('/api/create', (req, res) => {
    let response = {
        email : req.query.email,
        login : req.query.login,
        firstName : req.query.firstname,
        lastName : req.query.lastname,
        gender : req.query.gender,
        password : req.query.password,
        re_pw : req.query.confirm
    }

    //Check if every field is full
    if (typeof response.email == 'undefined' || response.email == '' ||  typeof response.login == 'undefined' || response.login == '' || typeof response.firstName == 'undefined'|| response.firstName == '' || typeof response.lastName == 'undefined' || response.lastName == '' || typeof response.gender == 'undefined' || response.gender == '' || typeof response.password == 'undefined' || response.password == '' || typeof response.re_pw == 'undefined' || response.re_pw == '') {
        res.status(500);
        res.end("Empty field");
    }
    //Check if passwords are both equal
    else if (response.password != response.re_pw) {
        res.status(500);
        res.end("Passwords don't match");
    }

    //Check is password is long and good enough (see with Flo)

    //Check if login is unique (see how to do multiple queries)

    //Check if gender is either Male or female

    //Check if firtsname is correct

    //Check if lastname is correct

    let hashed_pw = pw_hash.generate(response.password);


    // const sql = "INSERT INTO users(login, firstName, lastName, gender, email, pwd) " +
    //     `VALUES("${response.login}", "${response.firstName}", "${response.lastName}", "${response.gender}", "${response.email}", "${hashed_pw}");`;
    //
    //  connection.query(sql , (err, result) => {
    //      if (err) throw err;
    //      console.log("Result: " + result);
    //  })
    res.end("User created");
});


const port = 5000;

app.listen(port, () => `Server running on port ${port}`);