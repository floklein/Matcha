const express = require('express');
const router = express.Router();

const mysql = require('mysql');
const passport = require('passport');

// CONNECT TO DATABASE
let connection = mysql.createConnection({
  host: 'localhost',
  port: '3306',
  user: 'root',
  password: 'root',
  database: 'matcha'
});

connection.connect(function (err) {
  if (err) throw err
});

function get_pos(user_id, result) {
  for (let i = 0; i < result.length; i++) {
    if (result[i].user_id === user_id)
      return (i);
  }
  return (-1);
}

// FETCH PROFILE INFOS
router.get('/:username', passport.authenticate('jwt', {session: false}), (req, res) => {
  let username = req.params.username;
  let response = {};
  let error = false;

  if (typeof username === 'undefined' || username.length === 0) {
    response = {
      ...response,
      profile: 'Le nom d\'utilisateur est requis.'
    };
    error = true;
  }

  if (error) {
    res.status(400);
    return res.json(response);
  }

  let sql = `SELECT id, username, email, firstName, lastName, age, gender, sexuality, bio, profile_pic, popularity, latitude, longitude FROM users JOIN infos ON users.id = infos.user_id WHERE username = "${username}" OR id = "${username}";`;
  connection.query(sql, (err, result) => {
    if (err) throw err;

    if (result.length === 0) {
      response = {
        ...response,
        profile: 'Utilisateur non existant.'
      };
      error = true;
    }

    if (error) {
      res.status(400);
      return res.json(response);
    }

    let sql = `SELECT pic1, pic2, pic3, pic4, pic5 FROM photos JOIN users ON users.id = photos.user_id WHERE users.username = "${username}" OR users.id = "${username}";`;
    connection.query(sql, (err, result2) => {
      if (err) throw err;

      let photos = [];
      if (result2.length !== 0) {
        photos = [result2[0].pic1, result2[0].pic2, result2[0].pic3, result2[0].pic4, result2[0].pic5].filter((photo) => photo);
      }

      let sql = `SELECT tag FROM interests JOIN users ON users.id = interests.user_id WHERE users.username = "${username}" OR users.id = "${username}";`;
      connection.query(sql, (err, result3) => {
        if (err) throw err;

        sql = "SELECT popularity, user_id FROM infos ORDER BY popularity";
        connection.query(sql, (err, result4) => {
          if (err) throw err;

          const pos = get_pos(result[0].id, result4);
          const nb_user = result4.length;
          let quart = Math.floor(4 * pos / nb_user) + 1;

          sql = `SELECT liker_id, liked_id FROM likes WHERE (liker_id=${req.user.id} AND liked_id=${result[0].id}) OR (liker_id=${result[0].id} AND liked_id=${req.user.id})`;
          connection.query(sql, (err, result5) => {
            if (err) throw err;

            let like;
            if (result5.length === 2) {
              like = 'both';
            } else if (result5.length === 0) {
              like = 'no';
            } else if (result5[0].liker_id === req.user.id) {
              like = 'me';
            } else if (result5[0].liked_id === req.user.id) {
              like = 'you'
            }

            result[0] = {
              ...result[0],
              photos: photos,
              popularity: {
                score: result[0].popularity,
                rank: quart
              },
              interests: result3,
              like: like
            };
            return res.json(result[0]);
          });
        })
      });
    });
  });
});


module.exports = router;