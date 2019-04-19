const express = require('express');
const router = express.Router();

const mysql = require('mysql');

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

// FETCH PROFILE INFOS
router.get('/:username', (req, res) => {
  let username = req.params.username;
  let response = {};
  let error = false;

  if (typeof username === 'undefined' || username.length === 0) {
    response = {
      ...response,
      profile: 'Le nom d\'utilisateur est requis.'
    };
    error = true;
  }

  if (error) {
    res.status(400);
    return res.json(response);
  }

  let sql = `SELECT id, username, email, firstName, lastName, age, gender, sexuality, bio, profile_pic, popularity, latitude, longitude FROM users JOIN infos ON users.id = infos.user_id WHERE username = "${username}";`;
  connection.query(sql, (err, result) => {
    if (err) throw err;

    if (result.length === 0) {
      response = {
        ...response,
        profile: 'Utilisateur non existant.'
      };
      error = true;
    }

    if (error) {
      res.status(400);
      return res.json(response);
    }

    return res.json(result[0]);
  });
});

module.exports = router;