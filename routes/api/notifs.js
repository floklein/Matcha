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

router.get('/unread', (req, res) => {
  const user = jwt_check.getUsersInfos(req.headers.authorization);
  if (user.id === -1) {
    return res.status(401).json({error: 'unauthorized access'});
  }

  const sql = "SELECT COUNT(id) as nb from notifs " +
    `WHERE user_id = ${user.id} AND` +
    "`read` = false; ";
  connection.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result);
  })
});

router.get('/', (req, res) => {
  const user = jwt_check.getUsersInfos(req.headers.authorization);
  if (user.id === -1) {
    return res.status(401).json({error: 'unauthorized access'});
  }

  const sql = "SELECT type, content, `read` from notifs " +
    `WHERE user_id = ${user.id} ORDER BY time DESC; `;
  connection.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result);
  })
});

router.patch('/readAll', (req, res) => {
  const user = jwt_check.getUsersInfos(req.headers.authorization);
  if (user.id === -1) {
    return res.status(401).json({error: 'unauthorized access'});
  }

  const sql = "UPDATE notifs SET `read`=true " +
    `WHERE user_id = ${user.id};`;
  connection.query(sql, (err) => {
    if (err) throw err;
    return res.json({});
  })
});

router.post('/', (req, res) => {
  const user = jwt_check.getUsersInfos(req.headers.authorization);
  if (user.id === -1) {
    return res.status(401).json({error: 'unauthorized access'});
  }
  const request = {
    type: req.body.type,
    content: req.body.content,
  };

  //TODO: More if to check if values are correct
  const sql = "INSERT INTO notifs(user_id, type, content, time) " +
    `VALUES(${user.id}, "${request.type}", "${request.content}", now());`;
  connection.query(sql, (err) => {
    if (err) throw err;
    res.json({});
  })
});


module.exports = router;