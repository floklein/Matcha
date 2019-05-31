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

router.get('/topFifty', (req, res) => {
  const sql = "SELECT latitude, longitude, gender, profile_pic, firstName, lastName FROM infos ORDER BY popularity desc LIMIT 100;";
  connection.query(sql, (err, result) => {
    if (err) throw err;
    return res.json(result);
  })
});

module.exports = router;