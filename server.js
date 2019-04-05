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
    let error = false;

    //Check if every field is full
    if (typeof response.email == 'undefined' || response.email == '' ||  typeof response.login == 'undefined' || response.login == '' || typeof response.firstName == 'undefined'|| response.firstName == '' || typeof response.lastName == 'undefined' || response.lastName == '' || typeof response.gender == 'undefined' || response.gender == '' || typeof response.password == 'undefined' || response.password == '' || typeof response.re_pw == 'undefined' || response.re_pw == '') {
        error = true;
        res.status(400);
        res.write("Empty field\n");
    }
    //Check if passwords are both equal
    else if (response.password != response.re_pw) {
        error = true;
        res.status(400);
        res.write("Passwords don't match\n");
    }

    //Check is password is long and good enough
    if (!response.password.match('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,64}$')) {
        error = true;
        res.status(400);
        res.write("Password not strong enough\n");
    }

    //Check if login is unique (see how to do multiple queries)


    //Check if login is long enough
    if (!response.login.match('^[a-z]{4,30}$')) {
        error = true;
        res.status(400);
        res.write("Login must be between 4 and 30 characters\n");
    }

    //Check if gender is either Male or female
    if (response.gender != "Homme" && response.gender !="Femme") {
        error = true;
        res.status(400);
        res.write("Gender should be Male or Female\n");
    }

    //Check if firtsname is correct
    if (!response.firstName.match('^([a-zA-Zàáâäçèéêëìíîïñòóôöùúûü]+(( |\')[a-zA-Zàáâäçèéêëìíîïñòóôöùúûü]+)*)+([-]([a-zA-Zàáâäçèéêëìíîïñòóôöùúûü]+(( |\')[a-zA-Zàáâäçèéêëìíîïñòóôöùúûü]+)*)+)*$')) {
        error = true;
        res.status(400);
        res.write("First name is wrong\n");
    }

    //Check if lastname is correct
    if (!response.lastName.match('^([a-zA-Zàáâäçèéêëìíîïñòóôöùúûü]+(( |\')[a-zA-Zàáâäçèéêëìíîïñòóôöùúûü]+)*)+([-]([a-zA-Zàáâäçèéêëìíîïñòóôöùúûü]+(( |\')[a-zA-Zàáâäçèéêëìíîïñòóôöùúûü]+)*)+)*$')) {
        error = true;
        res.status(400);
        res.write("Last name is wrong\n");
    }

    if (error)
        res.end();
    //Check if email has right format

    let hashed_pw = pw_hash.generate(response.password);


    // const sql = "INSERT INTO users(login, firstName, lastName, gender, email, pwd) " +
    //     `VALUES("${response.login}", "${response.firstName}", "${response.lastName}", "${response.gender}", "${response.email}", "${hashed_pw}");`;
    //
    //  connection.query(sql , (err, result) => {
    //      if (err) throw err;
    //      console.log("Result: " + result);
    //  })


    //Send an email if everything is alright


    res.end("User created");
});


const port = 5000;

app.listen(port, () => `Server running on port ${port}`);