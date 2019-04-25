const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const passport = require('passport');

//Connect to db
let connection = mysql.createConnection({
  host: 'localhost',
  port: '3306',
  user: 'root',
  password: 'root',
  database: 'matcha'
});

connection.connect(function (err) {
  if (err) throw err;
});

router.post('/', passport.authenticate('jwt', {session: false}), (req, res) => {
  let request = {
    disliked: req.body.disliked
  };
  let errors = {};

  if (typeof request.disliked === 'undefined' || request.disliked === "") {
    errors = {
      ...errors,
      disliked: "Utilisateur requis"
    };
    return res.status(400).json(errors);
  }

  //Check if 2 users are the same
  if (req.user.id === request.disliked) {
    errors = {
      ...errors,
      disliked: "Vous ne pouvez pas vous disliker vous-même"
    };
    return res.status(400).json(errors);
  }

  //Check if disliked exists
  let sql = `SELECT id from users WHERE id = ${request.disliked}`;
  connection.query(sql, (err, result) => {
    if (result && result.length === 0) {
      errors = {
        ...errors,
        disliked: "Utilisateur inexistant"
      };
      return res.status(400).json(errors);
    }

    if (err) throw err;
    //Check if already disliked
    sql = `SELECT * FROM dislikes WHERE disliker_id = ${req.user.id} AND disliked_id = ${request.disliked}`;
    connection.query(sql, (err, result) => {
      if (result && result.length !== 0) { //If already disliked, do nothing
        return res.json();
      }

      sql = `INSERT INTO dislikes(disliker_id, disliked_id) VALUES(${req.user.id}, ${request.disliked})`;
      connection.query(sql, (err, result) => {
        if (err) throw err;
        return res.json();
      });
    })
  })
});

module.exports = router;