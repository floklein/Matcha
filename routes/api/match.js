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

function isLikedBack(liked, liker) {
  return new Promise(resolve => {
    let sql = "SELECT id from likes " +
      `WHERE liker_id = ? AND liked_id = ?;`;
    connection.query(sql, [liked, liker], (err, res) => {
      if (err) throw err;
      if (res.length === 0)
        resolve(false);
      else {
        let sql = "SELECT id from blocks " +
          `WHERE (blocker_id = ? AND blocked_id = ?) OR (blocked_id = ? AND blocker_id = ?);`;
        connection.query(sql, [liked, liker, liked, liker], (err, res) => {
          if (err) throw err;
          resolve (!(res.length));
        })
      }
    })
  })
}

router.get('/', (req, res) => {
  const user = jwt_check.getUsersInfos(req.headers.authorization);
  if (user.id === -1) {
    return res.status(401).json({error: 'unauthorized access'});
  }
  let response = [];

  //Get all our likes
  const sql = "SELECT liked_id, liker_id from likes " +
    `WHERE liker_id = ?;`;
  connection.query(sql, [user.id], (err, resp) => {
    if (err) throw err;
    if (resp.length === 0)
      return res.json({});
    for (let i = 0; i < resp.length; i++) {
      isLikedBack(resp[i].liked_id, user.id)
        .then((bool) => {
          if (bool)
            response.push({id: resp[i].liked_id,
              me: resp[i].liker_id});
          if (i === resp.length - 1)
            return res.json(response);
        });
    }
  })
});

module.exports = router;