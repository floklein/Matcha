const express = require('express');
const router = express.Router();

const jwt_check = require('../../utils/jwt_check');
const connection = require('../../utils/sql_connection');


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