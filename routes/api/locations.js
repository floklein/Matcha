const express = require('express');
const router = express.Router();

const connection = require('../../utils/sql_connection');


router.get('/topFifty', (req, res) => {
  const sql = "SELECT latitude, longitude, gender, profile_pic, firstName, lastName FROM infos ORDER BY popularity desc LIMIT 100;";
  connection.query(sql, (err, result) => {
    if (err) throw err;
    return res.json(result);
  })
});

module.exports = router;