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

  const sql = "UPDATE connection SET last_connection=NOW()" +
    `WHERE user_id = ?;`;
  connection.query(sql, [user.id], (err) => {
    if (err) throw err;
    return res.end();
  })
});

module.exports = router;