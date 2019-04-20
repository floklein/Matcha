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

    let sql = `SELECT pic1, pic2, pic3, pic4, pic5 FROM photos JOIN users ON users.id = photos.user_id WHERE users.username = "${username}";`;
    connection.query(sql, (err, result2) => {
      if (err) throw err;

      let photos = [];
      if (result2.length !== 0) {
        photos = [result2[0].pic1, result2[0].pic2, result2[0].pic3, result2[0].pic4, result2[0].pic5].filter((photo) => photo);
      }

      //TODO: Needs queries for popularity, "liked" status, etc
      result[0] = {
        ...result[0],
        photos: photos,
        popularity: {
          score: Math.floor(Math.random() * 100),
          rank: Math.round(Math.random() * 3 + 1)
        }
      };
      return res.json(result[0]);
    });
  });
});

module.exports = router;