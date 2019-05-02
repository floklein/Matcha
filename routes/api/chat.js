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
  let match_id = req.body.id;

  const sql = "SELECT sender_id, receiver_id, message, time FROM messages " +
    `WHERE (sender_id = ${match_id} AND receiver_id = ${user.id}) OR (sender_id = ${user.id} AND receiver_id = ${match_id}) ` +
    "ORDER BY time DESC LIMIT 20;";
  connection.query(sql, (err, resp) => {
    if (err) throw err;
    return res.json(resp);
  })
});

router.post('/', (req, res) => {
  const user = jwt_check.getUsersInfos(req.headers.authorization);
  if (user.id === -1) {
    return res.status(401).json({error: 'unauthorized access'});
  }
  let match_id = req.body.id;
  let message = req.body.message;

  let sql = "SELECT id FROM likes " +
    `WHERE (liker_id = ${match_id} AND liked_id = ${user.id}) OR (liked_id = ${match_id} AND liker_id = ${user.id});`;
  connection.query(sql, (err, result) => {
    if (err) throw err;
    if (result.length !== 2)
      return res.status(400).json({id: "Vous ne pouvez envoyer de message qu'aux utilisateurs déjà matchés"});
    sql = "SELECT id from blocks " +
      `WHERE (blocker_id = ${match_id} AND blocked_id = ${user.id}) OR (blocked_id = ${match_id} AND blocker_id = ${user.id});`;
    connection.query(sql, (err, result) => {
      if (err) throw err;
      if (result.length)
        return res.status(400).json({id: "Vous ne pouvez envoyer de message aux utilisateurs bloqués / qui vous ont bloqués"});

      sql = "INSERT INTO messages(sender_id, receiver_id, message, time) " +
        `VALUES(${user.id}, ${match_id}, "${message}", now());`;
      connection.query(sql, (err, resp) => {
        if (err) throw err;
        return res.json({});
      })
    })
  });
});

module.exports = router;