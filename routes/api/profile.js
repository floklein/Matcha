const axios = require('axios');
let GMapiKey = require('../../config/GMapikey');
GMapiKey = GMapiKey.GMapiKey;

const express = require('express');
const router = express.Router();

const mysql = require('mysql');
const jwt_check = require('../../utils/jwt_check');

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

getAddressPart = (address, Part) => {
  const findType = type => type.types[0] === Part;
  const location = address.map(obj => obj);
  const rr = location.filter(findType)[0];

  return (rr.long_name);
};

function get_pos(user_id, result) {
  for (let i = 0; i < result.length; i++) {
    if (result[i].user_id === user_id)
      return (i);
  }
  return (-1);
}

// FETCH PROFILE INFOS
router.get('/:username', (req, res) => {
  const user = jwt_check.getUsersInfos(req.headers.authorization);
  if (user.id === -1) {
    return res.status(401).json({error: 'unauthorized access'});
  }


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

      let sql = `SELECT interests.id, tag, tag AS name FROM interests JOIN users ON users.id = interests.user_id WHERE users.username = "${username}" OR users.id = "${username}";`;
      connection.query(sql, (err, result3) => {
        if (err) throw err;

        let sql = "SELECT popularity, user_id FROM infos ORDER BY popularity";
        connection.query(sql, (err, result4) => {
          if (err) throw err;

          const pos = get_pos(result[0].id, result4);
          const nb_user = result4.length;
          let quart = Math.floor(4 * pos / nb_user) + 1;

          let sql = `SELECT liker_id, liked_id FROM likes WHERE (liker_id=${user.id} AND liked_id=${result[0].id}) OR (liker_id=${result[0].id} AND liked_id=${user.id})`;
          connection.query(sql, (err, result5) => {
            if (err) throw err;

            let like;
            if (result5.length === 2) {
              like = 'both';
            } else if (result5.length === 0) {
              like = 'no';
            } else if (result5[0].liker_id === user.id) {
              like = 'me';
            } else if (result5[0].liked_id === user.id) {
              like = 'you'
            }

            let sql = `SELECT blocker_id, blocked_id FROM blocks WHERE (blocker_id=${user.id} AND blocked_id=${result[0].id}) OR (blocker_id=${result[0].id} AND blocked_id=${user.id})`;
            connection.query(sql, (err, result5) => {
              if (err) throw err;

              let isBlocked = ((result5[0] !== undefined && result5[0].blocker_id === user.id) || (result5[1] !== undefined && result5[1].blocker_id === user.id));
              let amBlocked = ((result5[0] !== undefined && result5[0].blocked_id === user.id) || (result5[1] !== undefined && result5[1].blocked_id === user.id));

              let sql = `SELECT UNIX_TIMESTAMP(last_connection) as time, UNIX_TIMESTAMP(Now()) as now, DATE_FORMAT(last_connection, '%e %M à %k:%i') as formatted FROM connection WHERE user_id=${result[0].id};`;
              console.log(sql);
              connection.query(sql, (err, result6) => {
                if (err) throw err;
                console.log(result6);

                let diff = result6[0].now - result6[0].time;
                let status = diff > 300 ? 'offline' : 'online';
                let formatted = result6[0].formatted.replace('January', 'Jan.').replace('February', 'Fév.').replace('March', 'Mars').replace('Avril', 'Avril').replace('May', 'Mai').replace('June', 'Juin').replace('July', 'Juillet').replace('August', 'Août').replace('September', 'Sept.').replace('October', 'Oct.').replace('November', 'Nov.').replace('December', 'Déc.');
                let message = ((status === 'online') ? "En ligne " : ((result6[0].time === null) ?  "Jamais connecté" : `Hors ligne depuis le ${formatted}`)) ;

                axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${result[0].latitude},${result[0].longitude}&key=${GMapiKey}`)
                  .then(res_api => {
                    result[0] = {
                      ...result[0],
                      photos: photos,
                      popularity: {
                        score: result[0].popularity,
                        rank: quart
                      },
                      interests: result3,
                      like: like,
                      position: getAddressPart(res_api.data.results[0].address_components, "locality"),
                      isBlocked: isBlocked,
                      amBlocked: amBlocked,
                      connection: {
                        status,
                        message
                      }
                    };
                    return res.json(result[0]);
                  })
                  .catch((err) => {
                    result[0] = {
                      ...result[0],
                      photos: photos,
                      popularity: {
                        score: result[0].popularity,
                        rank: quart
                      },
                      interests: result3,
                      like: like,
                      position: "...",
                      isBlocked: isBlocked,
                      amBlocked: amBlocked,
                      connection: {
                        status,
                        message
                      }
                    };
                    return res.json(result[0]);
                  });
              });

            });
          });
        });
      });
    });
  });
});

module.exports = router;