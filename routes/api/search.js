const express = require('express');
const router = express.Router();

const mysql = require('mysql');
const jwt_check = require('../../utils/jwt_check');
const u_search = require('../../utils/user_search');

//Connect to db
let connection = mysql.createConnection({
  host: 'localhost',
  port: '3306',
  user: 'root',
  password: 'root',
  database: 'matcha'
});""

connection.connect(function (err) {
  if (err) throw err;
  console.log('You are now connected...')
});


router.post('/', (req, res) => {

  const user = jwt_check.getUsersInfos(req.headers.authorization);
  if (user.id === -1) {
    return res.status(401).json({error: 'unauthorized access'});
  }

  let request = {
    sort: req.body.sort,
    order: req.body.order,
    ageMin: req.body.ageMin,
    ageMax: req.body.ageMax,
    popularityMin: req.body.popularityMin,
    popularityMax: req.body.popularityMax,
    latitude: req.body.latitude,
    longitude: req.body.longitude,
    interests: req.body.interests,
    from: req.body.from,
    to: req.body.to
  };

  if (typeof req.body.sort == 'undefined' || (req.body.sort !== 'age' && req.body.sort !== 'distance' && req.body.sort !== 'popularity' && req.body.sort !== 'interests') || typeof req.body.order == 'undefined' || (req.body.order !== 'asc' && req.body.order !== 'desc') || typeof req.body.ageMin == 'undefined' || isNaN(req.body.ageMin) || req.body.ageMin === '' || typeof req.body.ageMax == 'undefined' || isNaN(req.body.ageMax) || req.body.ageMax === '' || req.body.ageMin > req.body.ageMax || typeof req.body.popularityMin == 'undefined' || isNaN(req.body.popularityMin) || req.body.popularityMin === '' || typeof req.body.popularityMax == 'undefined' || isNaN(req.body.popularityMax) || req.body.popularityMax === '' || req.body.popularityMax < req.body.popularityMin || typeof req.body.latitude == 'undefined' || isNaN(req.body.latitude) || req.body.latitude === '' || typeof req.body.longitude == 'undefined' || isNaN(req.body.longitude) || req.body.longitude === '' || req.body.longitude < req.body.latitude || typeof req.body.from == 'undefined' || isNaN(req.body.from) || req.body.from === '' || typeof req.body.to == 'undefined' || isNaN(req.body.to) || req.body.to === '' || req.body.from > req.body.to) {
    //|| typeof req.body.interests == 'undefined' || !Array.isArray(req.body.interests)) {
    return res.status(400).json({
      request: "Erreur dans les champs de recherche"
    });
  }
  const sql = "SELECT age, bio, profile_pic from infos " +
    `WHERE user_id = ${user.id};`;
  connection.query(sql, (err, first_result) => {
    if (err) throw err;
    if (!first_result || !first_result.length || first_result[0].age === null || first_result[0].profile_pic === null || first_result[0].bio === null) {
      return res.status(400).json({
        user: "Vous devez compléter votre profil étendu"
      })
    }
    let sort_function;
    const sql_getAll = "SELECT u.id, i.latitude, i.longitude, i.popularity " +
      `FROM users u INNER JOIN infos i on i.user_id = u.id WHERE u.id != ${user.id} AND ` +
      `i.age >= ${request.ageMin} AND i.age <= ${request.ageMax}  AND i.popularity >= ${request.popularityMin} and i.popularity <= ${request.popularityMax};`;
    connection.query(sql_getAll, (err, result) => {

      const tag_sql = "SELECT tag from interests " +
        `WHERE user_id = ${user.id}`;
      connection.query(tag_sql, (err, tag_res) => {
        if (err) throw err;

        let sql_pos = "SELECT latitude, longitude FROM infos " +
          `WHERE user_id = ${user.id}`;
        connection.query(sql_pos, (err, pos_res) => {
          if (err) throw err;

          u_search.blocks_past(user.id, result)
            .then((result) => {
                u_search.filters_interests(request.interests, result)
                  .then((result) => {
                    if (result.length === 0)
                      return res.json({});
                    for (let i = 0; i < result.length; i++) {
                      switch (request.sort) {
                        case "age":
                          sort_function = u_search.getAgeScore;
                          break;
                        case "distance":
                          sort_function = u_search.getDistanceScore;
                          break;
                        case "popularity":
                          sort_function = u_search.getPopularityScore;
                          break;
                        case "interests":
                          sort_function = u_search.getInterestsScore;
                          break;
                      }
                      let matchScore;
                      if (result[i])
                        matchScore = sort_function(user.id, result[i], tag_res, pos_res)
                          .then((score) => {
                              result[i] = {
                                ...result[i],
                                matchScore: score
                              };
                              if (i === result.length - 1) {
                                result.sort((first, second) => {
                                  if (request.order === "desc")
                                    return (second.matchScore.score - first.matchScore.score);
                                  else
                                    return (first.matchScore.score - second.matchScore.score)
                                });
                                let final_result = (result.map((item) => {
                                  return ({
                                    id: item.id,
                                    matchScore: item.matchScore.score,
                                  });
                                }));
                                return res.json(final_result.slice(request.from, request.to));
                              }
                            }
                          );
                    }
                  })
              }
            );

        });
      });
    })
  })
});

module.exports = router;