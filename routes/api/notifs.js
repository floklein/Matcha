const express = require('express');
const router = express.Router();

const mysql = require('mysql');
const jwt_check = require('../../utils/jwt_check');

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


router.get('/', (req, res) => {
  const user = jwt_check.getUsersInfos(req.headers.authorization);
  if (user.id === -1) {
    return res.status(401).json({error: 'unauthorized access'});
  }


});

router.post('/', (req, res) => {
  const user = jwt_check.getUsersInfos(req.headers.authorization);
  if (user.id === -1) {
    return res.status(401).json({error: 'unauthorized access'});
  }
  const request = {
    user_id: req.body.user_id,
    type: req.body.type,
    content: req.body.content,
  };

  //TODO: More if to check if values are correct
  const sql = "INSERT INTO notifs(user_id, type, content, time)" +
    `VALUES (${user_id}, ${type}, ${content}, now());`;
  connection.query(sql, (err) => {
    if (err) throw err;
  })
});


module.exports = router;