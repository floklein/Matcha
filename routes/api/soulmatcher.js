const express = require('express');
const router = express.Router();
const jwt_check = require('../../utils/jwt_check');
const u_search = require('../../utils/user_search');

const connection = require('../../utils/sql_connection');


function calculateScore(request, result_i, tag_res, pos_res, user) {
 return new Promise((resolve) => {
   let sort_function;
   switch (request.sort) {
     case "relevance":
       sort_function = u_search.getRelevanceScore;
       break;
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
   let resi_saved = result_i;
   if (result_i)
     sort_function(user.id, result_i, tag_res, pos_res)
       .then((score) => {
         result_i = {
           ...resi_saved,
           matchScore: score
         };
         resolve(result_i);
       })
       .catch(err => {});
 })
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
    distanceMin: req.body.distanceMin,
    distanceMax: req.body.distanceMax,
    interests: req.body.interests
  };

  if (typeof req.body.sort == 'undefined' || (req.body.sort !== 'relevance' && req.body.sort !== 'age' && req.body.sort !== 'distance' && req.body.sort !== 'popularity' && req.body.sort !== 'interests')|| typeof req.body.order == 'undefined' || (req.body.order !== 'asc' && req.body.order !== 'desc') || typeof req.body.ageMin == 'undefined' || isNaN(req.body.ageMin) || req.body.ageMin === '' || typeof req.body.ageMax == 'undefined' || isNaN(req.body.ageMax) || req.body.ageMax === '' || req.body.ageMin > req.body.ageMax || typeof req.body.popularityMin == 'undefined' || isNaN(req.body.popularityMin) || req.body.popularityMin === '' || typeof req.body.popularityMax == 'undefined' || isNaN(req.body.popularityMax) || req.body.popularityMax === ''|| req.body.popularityMax < req.body.popularityMin || typeof req.body.distanceMin == 'undefined' || isNaN(req.body.distanceMin)|| req.body.distanceMin === '' || typeof req.body.distanceMax == 'undefined' || isNaN(req.body.distanceMax) || req.body.distanceMax === '' || req.body.distanceMax < req.body.distanceMin || typeof req.body.interests == 'undefined' || !Array.isArray(req.body.interests)) {
    return res.status(400).json({
      request: "Erreur dans les champs de recherche"
    })
  }
  const sql = "SELECT age, bio, profile_pic from infos " +
    `WHERE user_id = ?;`;
  connection.query(sql, [user.id], (err, first_result) => {
    if (err) throw err;
    if (!first_result || !first_result.length || first_result[0].age === null || first_result[0].profile_pic === "/photos/default.png" || first_result[0].bio === null) {
      res.status(400).json({
        user: "Veuillez compléter votre profil avant d'utiliser Soulmatcher"
      });
      return res.end();
    }
    //get sexuality infos from user
    const sql_user_info = "SELECT sexuality, gender FROM infos " +
      `WHERE user_id = ?`;
    connection.query(sql_user_info, [user.id],(err, result) => {
      if (err) throw err;

      //if user is found, chose next query depending on sexuality and gender;
      let sql_main_query = "SELECT u.id, i.latitude, i.longitude, i.popularity " +
        `FROM users u INNER JOIN infos i on i.user_id = u.id WHERE u.id != ${user.id} AND `;

      if (result[0].sexuality == "heterosexual")
        sql_main_query += `(i.gender != "${result[0].gender}" AND i.sexuality != "homosexual") `;
      else if (result[0].sexuality == "homosexual")
        sql_main_query += `(i.gender = "${result[0].gender}" AND i.sexuality != "heterosexual") `;
      else
        sql_main_query += `((i.gender = "${result[0].gender}" AND i.sexuality != "heterosexual") OR (i.gender != "${result[0].gender}" AND i.sexuality != "homosexual")) `;

      sql_main_query += `AND i.age >= ? AND i.age <= ? AND i.popularity >= ? and i.popularity <= ?;`;
      connection.query(sql_main_query, [
        request.ageMin,
        request.ageMax,
        request.popularityMin,
        request.popularityMax
      ],(err, result) => {
        if (err) throw err;

        const tag_sql = "SELECT tag from interests " +
          `WHERE user_id = ?`;
        connection.query(tag_sql, [user.id],(err, tag_res) => {
          if (err) throw err;

          let sql_pos = "SELECT latitude, longitude FROM infos " +
            `WHERE user_id = ?`;
          connection.query(sql_pos, [user.id], (err, pos_res) => {
            if (err) throw err;

            //Filter by distance
            result = result.filter((user) => {
              const score = u_search.syncDistanceScore(user.id, user, tag_res, pos_res);
              return (score / 1000 >= request.distanceMin && score / 1000 <= request.distanceMax);
            });

            u_search.filters_past(user.id, result)
              .then((result) => {
                u_search.filters_interests(request.interests, result)
                  .then((result) => {
                    if (result.length === 0) {
                      return res.json({});
                    }
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
                        }));
                      })
                  })
                  .catch(err => {})
              })
              .catch(err => {});
          });
        });
      })
    })
  });
});

module.exports = router;