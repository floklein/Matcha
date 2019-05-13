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

  const sql = "SELECT id, user_id,  type, notifier_name, content, `read` from notifs " +
    `WHERE user_id = ${user.id} ORDER BY time DESC LIMIT 50; `;
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

router.patch('/settings', (req, res) => {
  const user = jwt_check.getUsersInfos(req.headers.authorization);
  if (user.id === -1) {
    return res.status(401).json({error: 'unauthorized access'});
  }

  const request = {
    visit: req.body.notifVisit,
    like: req.body.notifLike,
    unlike: req.body.notifUnlike,
    match: req.body.notifMatch,
    message: req.body.notifMessage,
  };

  if (!request || request.visit === null || request.like === null || request.unlike === null || request.match === null || request.message === null) {
    return res.json({
      outcome: "error",
      message: "Valeur manquante"
    })
  }

  const sql = "UPDATE settings " +
    `SET visit = ${request.visit}, ` + "`like`" + ` = ${request.like}, unlike = ${request.unlike}, \`match\` = ${request.match}, message = ${request.message} `+
    `WHERE user_id = ${user.id};`;
  connection.query(sql, (err) => {
    if (err) throw err;
    return res.json({
      outcome: "success",
      message: "Préférences modifiées"
    });
  })
});

router.get('/settings', (req, res) => {
  const user = jwt_check.getUsersInfos(req.headers.authorization);
  if (user.id === -1) {
    return res.status(401).json({error: 'unauthorized access'});
  }

  const sql = "SELECT * from settings " +
      `WHERE user_id = ${user.id};`;
  connection.query(sql, (err, result) => {
    if (err) throw err;
    return res.json({
      notifVisit: result[0].visit,
      notifLike: result[0].like,
      notifUnlike: result[0].unlike,
      notifMatch: result[0].match,
      notifMessage: result[0].message
    });
  })
});

module.exports = router;