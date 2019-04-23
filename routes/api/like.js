const express = require('express');
const router = express.Router();

const mysql = require('mysql');
const passport = require('passport');

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

router.post('/', passport.authenticate('jwt', { session: false}), (req, res) => {
  let response = {
    liked: req.body.liked
  };
  let res_err = {};

  if (typeof response.liked == 'undefined' || response.liked == "") {
    res_err = {
        ...res_err,
        liked: "Le compte à liker est requs"
    };
    return res.status(400).json(res_err);
  }
  else {
    //Check if 2 users are the same
    if (req.user.id === response.liked) {
        res_err = {
            ...res_err,
            liked: "Un utilisateur ne peut se liker lui-même"
        };
        return res.status(400).json(res_err);
    }
    else {
          //Check if liked exists
          let sql = `SELECT id from users WHERE id = ${response.liked}`;
          connection.query(sql, (err, result) => {
            if (result && result.length == 0) {
                res_err = {
                    ...res_err,
                    liked: "Le compte à liker non trouvé"
                };
                return res.status(400).json(res_err);
            }
            else {
                sql = `SELECT * FROM likes WHERE liked_id = ${req.user.id} AND liker_id = ${response.liked}`;
                connection.query(sql, (err, result) => {
                    if (err) throw err;
                    const is_liked = (result.length ? true : false);
                    //Check if already liked
                    sql = `SELECT * FROM likes WHERE liker_id = ${req.user.id} AND liked_id = ${response.liked}`;
                    connection.query(sql, (err, result) => {
                        if (result && result.length != 0) { //If already liked, unlike
                            //Delete like
                            sql = `DELETE FROM likes WHERE liker_id = ${req.user.id} AND liked_id = ${response.liked}`;
                            connection.query(sql, (err, result) => {
                                sql = "UPDATE infos SET popularity = popularity - 5 " +
                                    `WHERE user_id = ${response.liked};`;
                                connection.query(sql, (err) => {
                                    return res.json({like: (is_liked ? "you" : "no")});
                                })
                            })
                        }
                        else {  //Else, like
                            sql = `INSERT INTO likes(liker_id, liked_id) VALUES(${req.user.id}, ${response.liked})`;
                            connection.query(sql, (err, result) => {
                                //Give 5 popularity points when liked
                                sql = "UPDATE infos SET popularity = popularity + 5 " +
                                    `where user_id = ${response.liked};`;
                                connection.query(sql, (err, resp) => {
                                    if (err) throw err;
                                    console.log(resp);
                                    return res.json({like: (is_liked ? "both" : "me")});
                                })
                            })
                        }
                    })
                });
            }
          })
    }
  }
});

module.exports = router;