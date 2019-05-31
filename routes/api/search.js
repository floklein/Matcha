const express = require('express');
const router = express.Router();
const jwt_check = require('../../utils/jwt_check');
const u_search = require('../../utils/user_search');

const connection = require('../../utils/sql_connection');


function calculateScore(request, result_i, tag_res, pos_res, user) {
  return new Promise((resolve) => {
    let sort_function;
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
    if (result_i)
      sort_function(user.id, result_i, tag_res, pos_res)
        .then((score) => {
            result_i = {
              ...result_i,
              matchScore: score
            };
            resolve(result_i);
          }
        );
  });
}


router.post('/', (req, res) => {

  const user = jwt_check.getUsersInfos(req.headers.authorization);
  if (user.id === -1) {
    return res.status(401).json({error: 'unauthorized access'});
  }
  let promises = [];

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

  if (typeof req.body.sort == 'undefined' || (req.body.sort !== 'age' && req.body.sort !== 'distance' && req.body.sort !== 'popularity' && req.body.sort !== 'interests') || typeof req.body.order == 'undefined' || (req.body.order !== 'asc' && req.body.order !== 'desc') || typeof req.body.ageMin == 'undefined' || isNaN(req.body.ageMin) || req.body.ageMin === '' || typeof req.body.ageMax == 'undefined' || isNaN(req.body.ageMax) || req.body.ageMax === '' || req.body.ageMin > req.body.ageMax || typeof req.body.popularityMin == 'undefined' || isNaN(req.body.popularityMin) || req.body.popularityMin === '' || typeof req.body.popularityMax == 'undefined' || isNaN(req.body.popularityMax) || req.body.popularityMax === '' || req.body.popularityMax < req.body.popularityMin || typeof req.body.latitude == 'undefined' || isNaN(req.body.latitude) || typeof req.body.longitude == 'undefined' || isNaN(req.body.longitude) || typeof req.body.from == 'undefined' || isNaN(req.body.from) || req.body.from === '' || typeof req.body.to == 'undefined' || isNaN(req.body.to) || req.body.to === '' || req.body.from > req.body.to) {
    //|| typeof req.body.interests == 'undefined' || !Array.isArray(req.body.interests)) {
    return res.status(400).json({
      request: "Erreur dans les champs de recherche"
    });
  }
  const sql = "SELECT age, bio, profile_pic from infos " +
    `WHERE user_id = ?;`;
  connection.query(sql, [user.id],(err, first_result) => {
    if (err) throw err;
    if (!first_result || !first_result.length || first_result[0].age === null || first_result[0].profile_pic === "/photos/default.png" || first_result[0].bio === null) {
      return res.status(400).json({
        user: "Veuillez compléter votre profil avant d'utiliser la recherche"
      })
    }
    const sql_getAll = "SELECT u.id, i.latitude, i.longitude, i.popularity " +
      `FROM users u INNER JOIN infos i on i.user_id = u.id WHERE u.id != ? AND ` +
      `i.age >= ? AND i.age <= ?  AND i.popularity >= ? and i.popularity <= ?;`;
    connection.query(sql_getAll, [
      user.id,
      request.ageMin,
      request.ageMax,
      request.popularityMin,
      request.popularityMax
    ],(err, result) => {

      const tag_sql = "SELECT tag from interests " +
        `WHERE user_id = ?`;
      connection.query(tag_sql, [user.id], (err, tag_res) => {
        if (err) throw err;

        let sql_pos = "SELECT latitude, longitude FROM infos " +
          `WHERE user_id = ?`;
        connection.query(sql_pos, [user.id], (err, pos_res) => {
          if (err) throw err;
          if (request.latitude && request.longitude)
            pos_res[0] = {
              latitude: request.latitude,
              longitude: request.longitude
            };
          u_search.filters_pos(request.latitude, request.longitude, result)
            .then((result) => {
              u_search.blocks_past(user.id, result)
                .then((result) => {
                    u_search.filters_interests(request.interests, result)
                      .then((result) => {
                        if (result.length === 0)
                          return res.json({});
                        for (let i = 0; i < result.length; i++) {
                          promises.push(calculateScore(request, result[i], tag_res, pos_res, user))
                        }
                        Promise.all(promises)
                          .then((values) => {
                            values.sort((first, second) => {
                              if (request.order == "desc")
                                return (second.matchScore.score - first.matchScore.score);
                              else
                                return (first.matchScore.score - second.matchScore.score)
                            });
                            return res.json(values.map((item) => {
                              return ({
                                id: item.id,
                                matchScore: item.matchScore.score,
                                dist: item.matchScore.dist
                              })
                            }).filter((item, i) => {
                              return (i >= request.from && i < request.to);
                            }));
                          });
                      })
                  }
                );
            });
        });
      });
    })
  })
});

module.exports = router;