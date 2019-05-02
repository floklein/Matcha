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
  let response = [];

  const sql = "SELECT sender_id, receiver_id, message, time FROM messages " +
    `WHERE (sender_id = ${match_id} AND receiver_id = ${user.id}) OR (sender_id = ${user.id} AND receiver_id = ${match_id}) ` +
    "ORDER BY time DESC LIMIT 20;";
  connection.query(sql, (err, resp) => {
    if (err) throw err;
    return res.json(resp);
  })
});

module.exports = router;