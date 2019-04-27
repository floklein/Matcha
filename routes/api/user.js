const express = require('express');
const router = express.Router();

const pw_hash = require('password-hash');
const mysql = require('mysql');
const uuid = require('uuid');
const jwt = require('jsonwebtoken');
const jwt_check = require('../../utils/jwt_check');

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

// PRE-REGISTER
router.post('/preregister', (req, res) => {
  let info = {
    email: req.body.email,
    password: req.body.password,
    confirm: req.body.confirm
  };
  let response = {};
  let error = false;

  //Check is password is long and good enough
  if (typeof info.password === 'undefined' || !info.password.match('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,64}$')) {
    response = {
      ...response,
      password: "8 caractères min. (dont 1 maj. et 1 chiffre)"
    };
    error = true;
  }

  //Check if passwords are both equal
  else if (typeof info.password === 'undefined' || typeof info.password === 'undefined' || info.password !== info.confirm) {
    response = {
      ...response,
      confirm: "Mots de passe différents."
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
  } else {
    res.end();
  }
});


// REGISTER
router.post('/register', (req, res) => {
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

  //Check if username is unique
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
      const sql3 = "INSERT INTO infos(gender, user_id, popularity, firstName, lastName)" +
        `VALUES("${info.gender}", ${result.insertId}, 0, "${info.firstName}", "${info.lastName}")`;
      const id = result.insertId;
      connection.query(sql3, (err, result) => {
        const sql4 = "INSERT INTO verified(user_id, code, status)" +
          `VALUES (${id}, "${uuid.v4()}", false);`;
        //Send an email if everything is alright
        connection.query(sql4, (err, result) => {
          if (err) throw err;
          //end if everything went fine
          res.end(String(id));
        });
      })
    })
  })
});



router.post('/login', (req, res) => {
  let info = {
    username: req.body.username,
    password: req.body.password,
  };
  let response = {};
  let error = false;

  //Check if password and username are not empty and defined
    if (typeof info.username == 'undefined' || info.username == "") {
        response = {
            ...response,
            username: "Login ou adresse email requis"
        };
        error = true;
    }
    if (typeof info.password == 'undefined' || info.password == "") {
        response = {
            ...response,
            password: "Mot de passe est requis"
        };
        error = true;
    }

    //If both fields are full, keep going with the connection
    if (!error) {
        //Check if username matches a user
        let sql = `SELECT username, password, id, email FROM users WHERE username = "${info.username}" OR email = "${info.username}";`;
        connection.query(sql, (err, result) => {
            if (err) throw err;
            if (result.length == 0) {
                response = {
                    ...response,
                    login: "Login et/ou mot de passe invalides"
                };
                error = true;
            }
            //Check if password is wrong
            else if (!pw_hash.verify(info.password, result[0].password)) {
                response = {
                    ...response,
                    login: "Login et/ou mot de passe invalides"
                };
                error = true;
            }
      //if everything is good, connect the guy by creating token
      if (!error) {

        const payload = {
          id: result[0].id,
          email: result[0].email,
          username: result[0].username
        };

        jwt.sign(payload, 'Mortparequipe', { expiresIn: 21600 }, (err, token) => {
          res.json({
              success: true,
              token
          })
        });

      }
      else {
        res.status(400);
        return res.json(response);
      }
    })
  }
  else {
    res.status(400);
    return res.json(response);
  }
});



//Set user infos
router.post('/infos/:id', (req, res) => {
  let info = {
    bio: req.body.bio,
    sexuality: req.body.sexuality,
    age: req.body.age,
    latitude: req.body.latitude,
    longitude: req.body.longitude,
    popularity: req.body.popularity,
    profilePic: req.body.profilePic
  };
  let res_err = {};
  let error = false;

  const sql = `SELECT id from users WHERE id = ${req.params.id}`;
  connection.query(sql, (err, result) => {
    if (result && result.length == 0) {
        res_err = {
            ...res_err,
            id: "Utilisateur non trouvé"
        };
        return res.status(400).json(res_err);
    }
    else {
      if (typeof info.bio == 'undefined' || info.bio == "") {
          res_err = {
              ...res_err,
              bio: "La bio est requise"
          };
          error = true
      }
      else if (info.bio.length > 420) {
          res_err = {
              ...res_err,
              bio: "La bio doit faire moins de 420 caractères"
          };
          error = true
      }
    }
    if (typeof info.sexuality == 'undefined' || (info.sexuality != "bisexual" && info.sexuality != "heterosexual" && info.sexuality != "homosexual")) {
        res_err = {
            ...res_err,
            sexuality: "La sexualité est incorrecte"
        };
        error = true
    }
    if (typeof info.age == 'undefined' || info.age == "" || isNaN(info.age)) {
        res_err = {
            ...res_err,
            age: "L'age est incorrect"
        };
        error = true
    }
      if (typeof info.latitude == 'undefined' || info.latitude == "") {
          res_err = {
              ...res_err,
              latitude: "La latitude est incorrecte"
          };
          error = true
      }
      if (typeof info.longitude == 'undefined' || info.longitude == "") {
          res_err = {
              ...res_err,
              longitude: "La longitude est incorrecte"
          };
          error = true
      }
      if (typeof info.popularity == 'undefined' || info.popularity == "") {
          res_err = {
              ...res_err,
              popularity: "La popularité est incorrecte"
          };
          error = true
      }
      if (typeof info.profilePic == 'undefined' || info.profilePic == "") {
          res_err = {
              ...res_err,
              profilePic: "La photo de profil est requise"
          };
          error = true
      }
    if (error) {
      res.status(400);
      res.status(400).json(res_err);
    }
    else {
      const sql2 = `UPDATE infos SET bio = "${info.bio}", sexuality = "${info.sexuality}", age = ${info.age} , latitude = ${info.latitude}, longitude = ${info.longitude}, popularity = ${info.popularity}, profile_pic = "${info.profilePic}"` +
        `WHERE user_id = ${req.params.id}`;
      connection.query(sql2, (err) => {
        if (err) throw (err);
      })
    }
    res.end(req.params.id);
  })
});

//TO DO : Change username in JWT when upi
router.post('/update', (req, res) => {
  const user = jwt_check.getUsersInfos(req.headers.authorization);
  if (user.id === -1) {
    return res.status(401).json({error: 'unauthorized access'});
  }

  const request = {
    username: req.body.username,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    bio: req.body.bio,
    sexuality: req.body.sexuality,
    gender: req.body.gender,
    interests: req.body.interests
  };

  //TO TEST WITH POSTMAN
  request.interests = [{id: 1, name: "Harry Potter"}, {id: 2, name: "Politique"}];

  let response = {};
  let error = false;

  //Check if username is unique and different from previous
  let sql = `SELECT username from users WHERE username = "${request.username} AND id != ${user.id}";`;
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
    if (typeof request.username === 'undefined' || !request.username.match('^[a-zA-Z0-9]{4,30}$')) {
      response = {
        ...response,
        username: "Nom d'utilisateur de 4 à 30 lettres."
      };
      error = true;
    }

    //Check if gender is either Male or female
    if (typeof request.gender === 'undefined' || request.gender !== 'male' && request.gender !== 'female' && request.gender !== 'other') {
      response = {
        ...response,
        gender: "Genre invalide."
      };
      error = true;
    }

    //Check if both names are incorrect
    if ((typeof request.firstName === 'undefined' || !request.firstName.match('^([a-zA-Zàáâäçèéêëìíîïñòóôöùúûü]+(( |\')[a-zA-Zàáâäçèéêëìíîïñòóôöùúûü]+)*)+([-]([a-zA-Zàáâäçèéêëìíîïñòóôöùúûü]+(( |\')[a-zA-Zàáâäçèéêëìíîïñòóôöùúûü]+)*)+)*$')) && (typeof request.lastName === 'undefined' || !request.lastName.match('^([a-zA-Zàáâäçèéêëìíîïñòóôöùúûü]+(( |\')[a-zA-Zàáâäçèéêëìíîïñòóôöùúûü]+)*)+([-]([a-zA-Zàáâäçèéêëìíîïñòóôöùúûü]+(( |\')[a-zA-Zàáâäçèéêëìíîïñòóôöùúûü]+)*)+)*$'))) {
      response = {
        ...response,
        name: "Prénom et nom invalides."
      };
      error = true;
    }

    //Check if firstname is correct
    else if (typeof request.firstName === 'undefined' || !request.firstName.match('^([a-zA-Zàáâäçèéêëìíîïñòóôöùúûü]+(( |\')[a-zA-Zàáâäçèéêëìíîïñòóôöùúûü]+)*)+([-]([a-zA-Zàáâäçèéêëìíîïñòóôöùúûü]+(( |\')[a-zA-Zàáâäçèéêëìíîïñòóôöùúûü]+)*)+)*$')) {
      response = {
        ...response,
        firstName: "Prénom invalide."
      };
      error = true;
    }

    //Check if lastname is correct
    else if (typeof request.lastName === 'undefined' || !request.lastName.match('^([a-zA-Zàáâäçèéêëìíîïñòóôöùúûü]+(( |\')[a-zA-Zàáâäçèéêëìíîïñòóôöùúûü]+)*)+([-]([a-zA-Zàáâäçèéêëìíîïñòóôöùúûü]+(( |\')[a-zA-Zàáâäçèéêëìíîïñòóôöùúûü]+)*)+)*$')) {
      response = {
        ...response,
        lastName: "Nom invalide."
      };
      error = true;
    }

    //Send json if there is an error and quit
    if (error === true) {
      res.status(400);
      res.end(JSON.stringify(response));
      return;
    }
    else {
      const sql_user_update = `UPDATE users SET username = "${request.username}" WHERE id = ${user.id};`;
      connection.query(sql_user_update, (err) => {
        if (err) throw err;
        const sql_infos_update = `UPDATE infos SET gender = "${request.gender}", sexuality = "${request.sexuality}", bio = "${request.bio}", firstName = "${request.firstName}", lastName ="${request.lastName}" WHERE user_id = ${user.id};`;
        connection.query(sql_infos_update, (err) => {
          if (err) throw err;
          const sql_delete_interests = `DELETE FROM interests WHERE user_id = ${user.id};`;
          connection.query(sql_delete_interests, (err) => {
            if (err) throw err;
            for (let i = 0; i < request.interests.length; i++) {
              let sql_add_interest = "INSERT INTO interests(user_id, tag)" +
                ` VALUES(${user.id}, "${request.interests[i].name}");`;
              connection.query(sql_add_interest, (err) => {
                if (err) throw err;
                if (i === request.interests.length -1) {
                  return res.json();
                }
              })
            }
          })
        })
      })
    }
  });
});

module.exports = router;