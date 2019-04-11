const express = require('express');
const router = express.Router();
const mysql = require('mysql');

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

router.post('/:id', (req, res) => {
  let response = {
    liked: req.query.liked
  };
  let res_array = [];

  if (typeof response.liked == 'undefined' || response.liked == "") {
    res_array.push({
      error: "liked",
      errorText: "le compte liked est requis"
    });
    res.status(400);
    res.end(JSON.stringify(res_array));
  }
  else {
    //Check if 2 users are the same
    if (req.params.id === response.liked) {
      res_array.push({
        error: "id",
        errorText: "Les deux utilisateurs ne peuvent etre identiques"
      });
      res.status(400);
      res.end(JSON.stringify(res_array));
    }
    else {
      //Check if liker exists
      let sql = `SELECT id from users WHERE id = ${req.params.id}`;
      connection.query(sql, (err, result) => {
        if (result && result.length == 0) {
          res_array.push({
            error: "id",
            errorText: "Liker non trouve"
          });
          res.status(400);
          res.end(JSON.stringify(res_array));
        }
        else {
          //Check if liked exists
          sql = `SELECT id from users WHERE id = ${response.liked}`;
          connection.query(sql, (err, result) => {
            if (result && result.length == 0) {
              res_array.push({
                error: "id",
                errorText: "Utilisateur like non trouve"
              });
              res.status(400);
              res.end(JSON.stringify(res_array));
            }
            else {
              //Check if already liked
              sql = `SELECT * FROM likes WHERE liker_id = ${req.params.id} AND liked_id = ${response.liked}`;
              connection.query(sql, (err, result) => {
                if (result && result.length != 0) { //If already liked, unlike
                  //Delete like
                  sql = `DELETE FROM likes WHERE liker_id = ${req.params.id} AND liked_id = ${response.liked}`;
                  connection.query(sql, (err, result) => {
                    res.end("dislike");
                  })
                }
                else {  //Else, like
                  sql = `INSERT INTO likes(liker_id, liked_id) VALUES(${req.params.id}, ${response.liked})`;
                  connection.query(sql, (err, result) => {
                    res.end("like");
                  })
                }
              })
            }
          })
        }
      })
    }
  }
});

module.exports = router;