const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const jwt_check = require('../../utils/jwt_check');

//Connect to db
let connection = mysql.createConnection({
  host: 'eu-cdbr-west-02.cleardb.net',
  port: '3306',
  user: 'bf02fec967e054',
  password: '4623bc9a',
  database: 'heroku_13dc1576b26f0ef',
});

connection.connect(function (err) {
  if (err) throw err;
});

router.post('/', (req, res) => {

  const user = jwt_check.getUsersInfos(req.headers.authorization);
  if (user.id === -1) {
    return res.status(401).json({error: 'unauthorized access'});
  }

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
  if (user.id === request.disliked) {
    errors = {
      ...errors,
      disliked: "Vous ne pouvez pas vous disliker vous-même"
    };
    return res.status(400).json(errors);
  }

  //Check if disliked exists
  let sql = `SELECT id from users WHERE id = ?`;
  connection.query(sql, [request.disliked], (err, result) => {
    if (result && result.length === 0) {
      errors = {
        ...errors,
        disliked: "Utilisateur inexistant"
      };
      return res.status(400).json(errors);
    }

    if (err) throw err;
    //Check if already disliked
    sql = `SELECT * FROM dislikes WHERE disliker_id = ? AND disliked_id = ?`;
    connection.query(sql, [user.id, request.disliked], (err, result) => {
      if (result && result.length !== 0) { //If already disliked, do nothing
        return res.json();
      }

      sql = `INSERT INTO dislikes(disliker_id, disliked_id) VALUES(?, ?)`;
      connection.query(sql, [user.id, request.disliked], (err, result) => {
        if (err) throw err;
        return res.json();
      });
    })
  })
});

module.exports = router;