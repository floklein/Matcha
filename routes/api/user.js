const express = require('express');
const router = express.Router();

const pw_hash = require('password-hash');
const mysql = require('mysql');
const uuid = require('uuid');
const bodyParser = require('body-parser');

const jsonParser = bodyParser.json();

// CONNECT TO DATABASE
let connection = mysql.createConnection({
  host: 'localhost',
  port: '3306',
  user: 'root',
  password: 'root',
  database: 'matcha'
});

connection.connect(function (err) {
  if (err) throw err
});

// REGISTER
router.post('/register', jsonParser, (req, res) => {
  let info = {
    email: req.body.email,
    username: req.body.username,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    gender: req.body.gender,
    password: req.body.password,
    confirm: req.body.confirm
  };
  let res_array = [];

  //Check if username is unique (see how to do multiple queries)
  let sql = `SELECT username from users WHERE username = "${info.username}";`;
  connection.query(sql, (err, result) => {
    if (err) throw err;
    if (result.length != 0) {
      res_array.push({
        error: "username",
        errorText: "Le username existe deja"
      });
    }

    //Check if username is long enough
    if (typeof info.username == 'undefined' || !info.username.match('^[a-zA-Z0-9]{4,30}$')) {
      res_array.push({
        error: "username",
        errorText: "Le username doit etre forme de 4 a 30 lettres"
      });
    }

    //Check is password is long and good enough
    if (typeof info.password == 'undefined' || !info.password.match('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,64}$')) {
      res_array.push({
        error: "password",
        errorText: "Le mot de passe doivent contenir au moins 8 caracteres (au moins une minuscule, une majuscule et un chiffre)"
      });
    }

    //Check if passwords are both equal
    else if (typeof info.password == 'undefined' || typeof info.password == 'undefined' || info.password != info.confirm) {
      res_array.push({
        error: "password",
        errorText: "Les mots de passe ne correspondent pas"
      });
    }

    //Check if gender is either Male or female
    if (typeof info.gender == 'undefined' || info.gender != "male" && info.gender != "female") {
      res_array.push({
        error: "gender",
        errorText: "Le genre est errone"
      });
    }

    //Check if both names are incorrect
    if ((typeof info.firstName == 'undefined' || !info.firstName.match('^([a-zA-Zàáâäçèéêëìíîïñòóôöùúûü]+(( |\')[a-zA-Zàáâäçèéêëìíîïñòóôöùúûü]+)*)+([-]([a-zA-Zàáâäçèéêëìíîïñòóôöùúûü]+(( |\')[a-zA-Zàáâäçèéêëìíîïñòóôöùúûü]+)*)+)*$')) && (typeof info.lastName == 'undefined' || !info.lastName.match('^([a-zA-Zàáâäçèéêëìíîïñòóôöùúûü]+(( |\')[a-zA-Zàáâäçèéêëìíîïñòóôöùúûü]+)*)+([-]([a-zA-Zàáâäçèéêëìíîïñòóôöùúûü]+(( |\')[a-zA-Zàáâäçèéêëìíîïñòóôöùúûü]+)*)+)*$'))) {
      res_array.push({
        error: "name",
        errorText: "Le prenom et le nom sont invalides"
      });
    }

    //Check if firstname is correct
    else if (typeof info.firstName == 'undefined' || !info.firstName.match('^([a-zA-Zàáâäçèéêëìíîïñòóôöùúûü]+(( |\')[a-zA-Zàáâäçèéêëìíîïñòóôöùúûü]+)*)+([-]([a-zA-Zàáâäçèéêëìíîïñòóôöùúûü]+(( |\')[a-zA-Zàáâäçèéêëìíîïñòóôöùúûü]+)*)+)*$')) {
      res_array.push({
        error: "name",
        errorText: "Le prenom est invalide"
      });
    }

    //Check if lastname is correct
    else if (typeof info.lastName == 'undefined' || !info.lastName.match('^([a-zA-Zàáâäçèéêëìíîïñòóôöùúûü]+(( |\')[a-zA-Zàáâäçèéêëìíîïñòóôöùúûü]+)*)+([-]([a-zA-Zàáâäçèéêëìíîïñòóôöùúûü]+(( |\')[a-zA-Zàáâäçèéêëìíîïñòóôöùúûü]+)*)+)*$')) {
      res_array.push({
        error: "name",
        errorText: "Le nom est invalide"
      });
    }

    //Check if email has right format
    if (typeof info.email == 'undefined' || !info.email.match('^(([^<>()\\[\\]\\\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$')) {
      res_array.push({
        error: "email",
        errorText: "L'email est invalide"
      });
    }

    //Send json if there is an error and quit
    if (res_array.length) {
      res.status(400);
      res.end(JSON.stringify(res_array));
      return;
    }

    //hash pw
    let hashed_pw = pw_hash.generate(info.password);

    //insert user in db
    const sql2 = "INSERT INTO users(username, firstName, lastName, email, password) " +
      `VALUES("${info.username}", "${info.firstName}", "${info.lastName}", "${info.email}", "${hashed_pw}");`;

    connection.query(sql2, (err, result) => {
      if (err) throw err;
      const sql3 = "INSERT INTO infos(gender, user_id, popularity)" +
        `VALUES("${info.gender}", ${result.insertId}, 0)`;
      const id = result.insertId;
      connection.query(sql3, (err, result) => {
        const sql4 = "INSERT INTO verified(user_id, code, status)" +
          `VALUES (${id}, "${uuid.v4()}", false);`;
        //Send an email if everything is alright
        connection.query(sql4, (err, result) => {
          if (err) throw err;
          //end if everything went fine
          console.log(`${info.firstName}'s fake account create`);
          res.end(String(id));
        });
      })
    })
  })
});

router.post('/username', (req, res) => {
  let info = {
    username: req.query.username,
    password: req.query.password,
  };
  let res_array = [];

  //Check if password and username are not empty and defined
  if (typeof info.username == 'undefined' || info.username == "") {
    res_array.push({
      error: "username",
      errorText: "le username est requis"
    })
  }
  if (typeof info.password == 'undefined' || info.password == "") {
    res_array.push({
      error: "password",
      errorText: "le mot de passe est requis"
    })
  }

  //If both fields are full, keep going with the connection
  if (!res_array.length) {
    //Check if username matches a user
    let sql = `SELECT username, password, id, email FROM users WHERE username = "${info.username}";`;
    connection.query(sql, (err, result) => {
      if (err) throw err;
      if (result.length == 0) {
        res_array.push({
          error: "password",
          errorText: "Erreur de connection. Login et/ou mot de passe errones"
        })
      }
      //Check if password is wrong
      else if (!pw_hash.verify(info.password, result[0].pwd)) {
        res_array.push({
          error: "password",
          errorText: "Erreur de connection. Login et/ou mot de passe errones"
        })
      }
      //if everything is good, connect the guy (don't know how to do it yet)
      if (!res_array.length) {
        req.session.username = result[0].username;
        req.session.user_id = result[0].id;
        req.session.email = result[0].email;
        res.json(req.session);
      }
      else {
        res.status(400);
        res.end(JSON.stringify(res_array));
      }
    })
  }
  else {
    res.status(400);
    res.end(JSON.stringify(res_array));
  }
});

//Set user infos
router.post('/infos/:id', jsonParser, (req, res) => {
  let info = {
    bio: req.body.bio,
    sexuality: req.body.sexuality,
    age: req.body.age
  };
  let res_array = [];

  const sql = `SELECT id from users WHERE id = ${req.params.id}`;
  connection.query(sql, (err, result) => {
    if (result && result.length == 0) {
      res_array.push({
        error: "id",
        errorText: "Utilisateur non trouve"
      });
      res.status(400);
      res.end(JSON.stringify(res_array));
    }
    else {
      if (typeof info.bio == 'undefined' || info.bio == "") {
        res_array.push({
          error: "bio",
          errorText: "la biographie est requise"
        })
      }
      else if (info.bio.length > 420) {
        res_array.push({
          error: "bio",
          errorText: "la biographie doit faire moins de 420 characteres"
        })
      }
    }
    if (typeof info.sexuality == 'undefined' || (info.sexuality != "bisexual" && info.sexuality != "heterosexual" && info.sexuality != "homosexual")) {
      res_array.push({
        error: "sexualite",
        errorText: "La sexualite est incorrecte"
      })
    }
    if (typeof info.age == 'undefined' || info.age == "" || isNaN(info.age)) {
      res_array.push({
        error: "age",
        errorText: "l'age est incorrect"
      })
    }
    if (res_array.length) {
      res.status(400);
      res.end(JSON.stringify(res_array));
    }
    else {
      const sql2 = `UPDATE infos SET bio = "${info.bio}", sexuality = "${info.sexuality}", age = ${info.age} ` +
        `WHERE user_id = ${req.params.id}`;
      connection.query(sql2, (err) => {
        if (err) throw (err);
      })
    }
    res.end();
  })
});

module.exports = router;