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
  let response = {};
  let error = false;

  //Check if username is unique (see how to do multiple queries)
  let sql = `SELECT username from users WHERE username = "${info.username}";`;
  connection.query(sql, (err, result) => {
    if (err) throw err;
    if (result.length !== 0) {
      response = {
        ...response,
        username: "Nom d'utilisateur indisponible."
      };
      error = true;
    }

    //Check if username is long enough
    if (typeof info.username === 'undefined' || !info.username.match('^[a-zA-Z0-9]{4,30}$')) {
      response = {
        ...response,
        username: "Nom d'utilisateur de 4 à 30 lettres."
      };
      error = true;
    }

    //Check is password is long and good enough
    if (typeof info.password === 'undefined' || !info.password.match('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,64}$')) {
      response = {
        ...response,
        password: "8 caractères min. (dont 1 maj. et 1 chiffre)"
      };
      error = true;
    }

    //Check if passwords are both equal
    else if (typeof info.password === 'undefined' || typeof info.password === 'undefined' || info.password != info.confirm) {
      response = {
        ...response,
        confirm: "Mots de passe différents."
      };
      error = true;
    }

    //Check if gender is either Male or female
    if (typeof info.gender === 'undefined' || info.gender !== 'male' && info.gender !== 'female' && info.gender !== 'other') {
      response = {
        ...response,
        gender: "Genre invalide."
      };
      error = true;
    }

    //Check if both names are incorrect
    if ((typeof info.firstName === 'undefined' || !info.firstName.match('^([a-zA-Zàáâäçèéêëìíîïñòóôöùúûü]+(( |\')[a-zA-Zàáâäçèéêëìíîïñòóôöùúûü]+)*)+([-]([a-zA-Zàáâäçèéêëìíîïñòóôöùúûü]+(( |\')[a-zA-Zàáâäçèéêëìíîïñòóôöùúûü]+)*)+)*$')) && (typeof info.lastName === 'undefined' || !info.lastName.match('^([a-zA-Zàáâäçèéêëìíîïñòóôöùúûü]+(( |\')[a-zA-Zàáâäçèéêëìíîïñòóôöùúûü]+)*)+([-]([a-zA-Zàáâäçèéêëìíîïñòóôöùúûü]+(( |\')[a-zA-Zàáâäçèéêëìíîïñòóôöùúûü]+)*)+)*$'))) {
      response = {
        ...response,
        name: "Prénom et nom invalides."
      };
      error = true;
    }

    //Check if firstname is correct
    else if (typeof info.firstName === 'undefined' || !info.firstName.match('^([a-zA-Zàáâäçèéêëìíîïñòóôöùúûü]+(( |\')[a-zA-Zàáâäçèéêëìíîïñòóôöùúûü]+)*)+([-]([a-zA-Zàáâäçèéêëìíîïñòóôöùúûü]+(( |\')[a-zA-Zàáâäçèéêëìíîïñòóôöùúûü]+)*)+)*$')) {
      response = {
        ...response,
        firstName: "Prénom invalide."
      };
      error = true;
    }

    //Check if lastname is correct
    else if (typeof info.lastName === 'undefined' || !info.lastName.match('^([a-zA-Zàáâäçèéêëìíîïñòóôöùúûü]+(( |\')[a-zA-Zàáâäçèéêëìíîïñòóôöùúûü]+)*)+([-]([a-zA-Zàáâäçèéêëìíîïñòóôöùúûü]+(( |\')[a-zA-Zàáâäçèéêëìíîïñòóôöùúûü]+)*)+)*$')) {
      response = {
        ...response,
        lastName: "Nom invalide."
      };
      error = true;
    }

    //Check if email has right format
    if (typeof info.email === 'undefined' || !info.email.match('^(([^<>()\\[\\]\\\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$')) {
      response = {
        ...response,
        email: "Adresse email invalide."
      };
      error = true;
    }

    //Send json if there is an error and quit
    if (error === true) {
      res.status(400);
      res.end(JSON.stringify(response));
      return;
    }

    //hash pw
    let hashed_pw = pw_hash.generate(info.password);

    //insert user in db
    const sql2 = "INSERT INTO users(username, email, password) " +
      `VALUES("${info.username}", "${info.email}", "${hashed_pw}");`;

    connection.query(sql2, (err, result) => {
        if (err) throw err;

        const sql3 = "INSERT INTO infos(gender, user_id, firstName, lastName, popularity)" +
        `VALUES("${info.gender}", ${result.insertId}, "${String(info.firstName)}", "${String(info.lastName)}", 0)`;
      const id = result.insertId;
      connection.query(sql3, (err, result) => {
          if (err) throw err;

        const sql4 = "INSERT INTO verified(user_id, code, status)" +
          `VALUES (${id}, "${uuid.v4()}", false);`;


        //Send an email if everything is alright
        connection.query(sql4, (err, result) => {
          //end if everything went fine
          res.end(String(id));
        });
      })
    })
  })
});


//SIGN IN
router.post('/signin', (req, res) => {
  let info = {
    username: req.body.username,
    password: req.body.password,
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
    let sql = "SELECT u.username, u.password, u.id, u.email, v.status FROM users u" +
                "INNER JOIN verified v ON u.id = v.user_id" +
                ` WHERE username = "${info.username}";`;
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
      if (!result.status) {
          res_array.push({
              error: "verification",
              errorText: "Votre compte n'a pas été vérifié"
          });
      }
      //if everything is good, connect the guy
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

//Set user additional infos
router.post('/infos/:id', jsonParser, (req, res) => {
  let info = {
    bio: req.body.bio,
    sexuality: req.body.sexuality,
    age: req.body.age,
    latitude: req.body.latitude,
    longitude: req.body.longitude
  };

  const sql = `SELECT id from users WHERE id = ${req.params.id}`;
  connection.query(sql, (err, result) => {
      let res_array = [];
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
      if (typeof info.latitude == 'undefined' || info.latitude == "" || typeof info.longitude == "undefined" || info.longitude == "") {
          res_array.push({
              error:"coord",
              errorText: "Les coordonnées de localisation sont erronées"
          });
      }
      if (res_array.length) {
          res.status(400);
          res.end(JSON.stringify(res_array));
      }
          else {
              const sql2 = `UPDATE infos SET bio = "${info.bio}", sexuality = "${info.sexuality}", age = "${info.age}", latitude=${info.latitude}, longitude=${info.longitude}` +
                  `WHERE user_id = ${req.params.id}`;
              connection.query(sql2, (err) => {
              })
          }
          res.end();
      })
    });


//LOGOUT user
router.get('/logout', (req, res) => {
    if (req.session) {
        req.session.destroy();
        res.end();
    }
    else {
        const res_array = {
            error: "user",
            errorText: "Utilisateur non connecté"
        };
        res.status(400).end(JSON.stringify(res_array));
    }
});

//GET ALL INFOS FROM USER BY ID
router.get('/infos/:id', (req, res) => {
    const sql = "SELECT u.username, u.email, i.firstName, i.lastName, i.age, i.gender, i.sexuality, i.bio, i.profile_pic, i.popularity" +
        "FROM users u " +
        "INNER JOIN infos i" +
        "ON i.id = u.user_id" +
        `WHERE u.user_id = ${req.params.id}`;
        connection.query(sql, (err, result) => {
            if (result.length == 0) {
                const res_array = {
                    error: "user",
                    errorText: "Utilisateur non trouvé"
                };
                res.status(400);
                res.end(JSON.stringify(res_array));
            }
            else {
                res.end(JSON.stringify(result));
            }
        })
});


module.exports = router;
