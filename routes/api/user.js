const express = require('express');
const router = express.Router();

const pw_hash = require('password-hash');
const mysql = require('mysql');
const uuid = require('uuid');
const jwt = require('jsonwebtoken');
const jwt_check = require('../../utils/jwt_check');
const nodemailer = require('nodemailer');
const mail = require('../../template/email');

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
    confirm: req.body.confirm,
    nomail: req.body.nomail
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
        const code = uuid.v4();
        const content = mail.templateEmail(`Bonjour ${info.username},`, "Vérifier mon email", "Bienvenue sur Soulmatch !", "Merci pour votre inscription sur Soulmatch. Afin de pouvoir vous connecter, veuillez vérifier votre adresse email en cliquant sur le lien ci-dessous.", `http://localhost:3000?action=verify-email&id=${id}&code=${code}`);
        const sql4 = "INSERT INTO verified(user_id, code, status)" +
          `VALUES (${id}, "${code}", false);`;
        //Send an email if everything is alright
        connection.query(sql4, (err, result) => {
          if (err) throw err;
          const sql5 = "INSERT INTO connection(user_id) " +
            `VALUES(${id});`;
          connection.query(sql5, (err) => {
            if (err) throw err;
            const sql6 = "INSERT INTO settings(user_id) " +
              `VALUES(${id});`;
            connection.query(sql6, (err) => {
              if (err) throw err;
              //send mail if everything went fine
              if (!info.nomail) {
                let transporter = nodemailer.createTransport({
                  service: 'gmail',
                  auth: {
                    user: 'matcha.fk.tbd@gmail.com',
                    pass: 'Qwerty123-'
                  }
                });
                let mailOptions = {
                  from: 'Matcha <no-reply@matcha.com>',
                  to: info.email,
                  subject: 'Vérification de compte',
                  html: content
                };
                transporter.sendMail(mailOptions);
              }
            });
            res.end(String(id));
          });
        });
      })
    })
  })
});

router.post('/resetPassword', (req, res) => {
  const request = {
    password: req.body.password,
    confirm: req.body.confirm,
    code: req.body.code,
    id: req.body.id
  };
  if (typeof request.code == 'undefined' || request.code === '' || typeof request.id == 'undefined' || request.password === 0) {
    return res.status(400).json({
      password: "Le lien est invalide, veuillez vérifier votre email"
    })
  }

  if ( typeof request.password == 'undefined' || request.password === '' || typeof request.confirm == 'undefined' || request.confirm === '') {
    return res.status(400).json({
      password: "Les mots de passe sont requis"
    })
  }

  if (request.password != request.confirm) {
   return res.status(400).json({
     confirm: "Les mots de passe sont différents"
   })
  }

  if (!request.password.match('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,64}$')) {
    return res.status(400).json({
      password: "8 caractères min. (dont 1 maj. et 1 chiffre)"
    })
  }

  let sql = "SELECT user_id from verified " +
    `WHERE code = "${request.code}" AND user_id = ${request.id};`;
  connection.query(sql, (err, result) => {
    if (err) throw err;
    if (!result.length)
      return res.status(400).json({
        password: "Le lien est invalide, veuillez vérifier votre email"
      });
    let hashed_pw = pw_hash.generate(request.password);
    sql = `UPDATE users set password = "${hashed_pw}" WHERE id = ${request.id};`;
    connection.query(sql, err => {
      if (err) throw err;
      return res.json();
    })
  })
});

router.post('/forgotPassword', (request, result) => {
  const sql = "SELECT v.code, u.email, u.username, u.id from verified v INNER JOIN users u on v.user_id = u.id " +
    `WHERE email = "${request.body.email}";`;
  connection.query(sql, (err, res) => {
    if (!res.length)
      return result.json();
    if (err) throw err;
    const content = mail.templateEmail(`Bonjour ${res[0].username},`, "Changer mot de passe", "Réinitialiser votre mot de passe ?", "Vous avez demandé à réinitialiser votre mot de passe. Veuillez cliquer sur le bouton ci-dessous. Si vous n'êtes pas à l'origine de cette demande, contactez immédiatement un webmestre.", `http://localhost:3000?action=forgot-password&id=${res[0].id}&code=${res[0].code}`);
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'matcha.fk.tbd@gmail.com',
        pass: 'Qwerty123-'
      }
    });
    let mailOptions = {
      from: 'Matcha <no-reply@matcha.com>',
      to: res[0].email,
      subject: 'Mot de passe oublié',
      html: content
    };
    transporter.sendMail(mailOptions);
    return result.json();
  });
});

router.post('/login', (req, res) => {
  let info = {
    username: req.body.username,
    password: req.body.password,
    position: req.body.position
  };
  let response = {};
  let error = false;

  if (!info.position || !info.position.latitude || !info.position.longitude || isNaN(info.position.latitude) || isNaN(info.position.longitude)) {
    return res.status(400).json({
      position: "Erreur de position"
    });}

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
        let sql = `SELECT u.username, u.password, u.id, u.email, v.status FROM users u INNER JOIN verified v ON u.id = v.user_id WHERE username = "${info.username}" OR email = "${info.username}";`;
        connection.query(sql, (err, result) => {
            if (err) throw err;
            if (result.length === 0) {
                response = {
                    ...response,
                    login: "Login et/ou mot de passe invalides"
                };
                error = true;
            }
            else if (!result[0].status) {
              response = {
                ...response,
                login: "Votre compte n'a pas été vérifié"
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

        const sql_pos = "UPDATE infos " +
          `SET latitude=${info.position.latitude}, longitude=${info.position.longitude}` +
          `WHERE user_id = ${result[0].id} AND address_modified=false;`;

        connection.query(sql_pos, (err) => {
          if (err) throw err;
        });
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


router.patch('/password', (req, res) => {
  const user = jwt_check.getUsersInfos(req.headers.authorization);
  if (user.id === -1) {
    return res.status(401).json({error: 'unauthorized access'});
  }
  let res_err = {};
  let error = false;

  const request = {
    old_pw: req.body.oldPassword,
    new_pw: req.body.newPassword,
    re_new: req.body.newConfirm,
  };

  if (typeof request.old_pw == 'undefined' || request.old_pw == '') {
    return res.status(400).json({
      outcome: "error",
      message: "Mot de passe requis"
    })
  }
  //Check if old pw is good
  let sql = `SELECT password FROM users WHERE id = ${user.id};`;
  connection.query(sql, (err, result) => {
    if (err) throw err;
    if (result.length === 0) {
      return res.status(400).json({
        outcome: "error",
        message: "Mot de passe invalide"
      });
    }
    //Check if password is wrong
    else if (!pw_hash.verify(request.old_pw, result[0].password)) {
      return res.status(400).json({
        outcome: "error",
        message: "Mot de passe invalide"
      });
    }
    if (error)
      return res.status(400).json(res_err);

    if (typeof request.new_pw === 'undefined' || !request.new_pw.match('^(?=.*[ a-z])(?=.*[A-Z])(?=.*\\d).{8,64}$')) {
      return res.status(400).json({
        outcome: "error",
        message: "Mot de passe invalide"
      });
    }
    if (request.new_pw !== request.re_new) {
      return res.status(400).json({
        outcome: "error",
        message: "Mots de passe différents"
      });
    }
      let hashed_pw = pw_hash.generate(request.new_pw);
      sql = "UPDATE users " +
        `SET password = "${hashed_pw} WHERE id = ${user.id}";`;
      connection.query(sql, (err) => {
        if (err) throw err;
        return res.json({
          outcome: "success",
          message: "Mot de passe modifié !"
        });
      })
  })
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

router.patch('/email', (req, res) => {
  const user = jwt_check.getUsersInfos(req.headers.authorization);
  if (user.id === -1) {
    return res.status(401).json({error: 'unauthorized access'});
  }

  const new_email = req.body.email;

  //Check if email has right format
  if (typeof new_email === 'undefined' || !new_email.match('^(([^<>()\\[\\]\\\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$')) {
    return res.status(400).json({
      outcome: "error",
      message: "Adresse email invalide."
    });
  }

  const sql = "UPDATE users " +
    `SET email = "${new_email}" WHERE id = ${user.id};`;
  connection.query(sql, (err) => {
    if (err) throw err;
    return res.json({
      outcome: "success",
      message: "Adresse email modifiée."
    })
  })
});

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
    interests: req.body.interests,
    age: req.body.age,
    latitude: req.body.latitude,
    longitude: req.body.longitude
  };
  let response = {};
  let error = false;

  if (typeof request.sexuality == 'undefined' || (request.sexuality != "bisexual" && request.sexuality != "heterosexual" && request.sexuality != "homosexual")) {
    response = {
      ...response,
      sexuality: "La sexualité est incorrecte"
    };
    error = true
  }
  if (typeof request.age == 'undefined' || request.age == "" || isNaN(request.age)) {
    response = {
      ...response,
      age: "L'age est incorrect"
    };
    error = true
  }

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

    else if (typeof request.bio === 'undefined' || request.bio.length === 0 || request.bio.length > 460) {
      response = {
        ...response,
        bio: "Bio invalide."
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
        let sql_infos_update;
        if (request.latitude && request.longitude && !isNaN(request.latitude) && !isNaN(request.longitude)) {
          sql_infos_update = `UPDATE infos SET gender = "${request.gender}", age=${request.age}, sexuality = "${request.sexuality}", bio = "${request.bio}", firstName = "${request.firstName}", lastName ="${request.lastName}", latitude=${request.latitude}, longitude=${request.longitude}, address_modified=1 WHERE user_id = ${user.id};`;}
        else {
          sql_infos_update = `UPDATE infos SET gender = "${request.gender}", age=${request.age}, sexuality = "${request.sexuality}", bio = "${request.bio}", firstName = "${request.firstName}", lastName ="${request.lastName}" WHERE user_id = ${user.id};`;}
        connection.query(sql_infos_update, (err) => {
          if (err) throw err;
          const sql_delete_interests = `DELETE FROM interests WHERE user_id = ${user.id};`;
          connection.query(sql_delete_interests, (err) => {
            if (err) throw err;
            if (!request.interests.length)
              return res.json();
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

router.post('/delete', (req, resp) => {
  const user = jwt_check.getUsersInfos(req.headers.authorization);
  if (user.id === -1) {
    return res.status(401).json({error: 'unauthorized access'});
  }

  const pw = req.body.password;
  let sql = "Select password from users " +
      `WHERE id = ${user.id};`;
  connection.query(sql, (err, result) => {
    if (err) throw err;
    if (!result || !result[0] || !result[0].password || !pw_hash.verify(pw, result[0].password))
      return resp.status(400).json({
        outcome: "error",
        message: "Mauvais mot de passe"
      });
    sql = "DELETE users, infos, verified, likes, connection, photos, settings, interests " +
        "FROM users " +
        "LEFT JOIN infos ON users.id = infos.user_id " +
        "LEFT JOIN verified ON users.id = verified.user_id " +
        "LEFT JOIN likes ON users.id = likes.liker_id " +
        "LEFT JOIN connection ON users.id = connection.user_id " +
        "LEFT JOIN photos ON users.id = photos.user_id " +
        "LEFT JOIN settings ON users.id = settings.user_id " +
        "LEFT JOIN interests ON users.id = interests.user_id " +
        `WHERE users.id = ${user.id};`;
    console.log(sql);
    connection.query(sql, (err) => {
      if (err) throw err;
      return resp.json({
        outcome: "success",
        message: "Au revoir"
      });
    })
  })
});

router.get('/getMaxPopAndAge', (req, res) => {
  const sql = "SELECT MAX(popularity) as max_pop, Max(age) as max_age FROM infos";
  connection.query(sql, (err, resp) => {
    if (err) throw err;
    if (resp.length > 0 && resp[0] && resp[0].max_age !== null && resp[0].max_pop !== null)
      return res.json(resp);
    else {
      return res.json([{
        max_pop: 200,
        max_age: 77
      }])
    }
  })
});

module.exports = router;