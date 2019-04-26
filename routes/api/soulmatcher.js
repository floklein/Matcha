const express = require('express');
const router = express.Router();

const mysql = require('mysql');
const geolib = require('geolib');
const jwt_check = require('../../utils/jwt_check');

//Connect to db
let connection = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'root',
    database: 'matcha'
});

connection.connect(function(err) {
    if (err) throw err
    console.log('You are now connected...')
});

function getRelevanceScore(id, infos, tag_res, pos_res) {
    return new Promise(resolve => {
        let matchingScore = 0;

        let sql = "SELECT tag from interests " +
            `WHERE user_id = ${infos.id}`;
        connection.query(sql, (err, res) => {
           // if (err) throw err;

            //Filter one array of tags with the other one to get nb of common tags
            const filtered_array = tag_res.filter((tag) => {
                for(let j = 0; j < res.length; j++) {
                    if (tag.tag === res[j].tag)
                        return true;
                }
                return false;
            });
            matchingScore += 50 * filtered_array.length;

            //Add 0.1 matchingScore per Pop point
            matchingScore +=  infos.popularity;

            if (infos.latitude && infos.longitude && pos_res[0].latitude && pos_res[0].longitude) {
                const dist = geolib.getDistance(
                    {latitude: infos.latitude, longitude: infos.longitude},
                    {latitude: pos_res[0].latitude, longitude: pos_res[0].longitude}
                );
                matchingScore -= dist / 10000;
            }

            //Check if other user already liked me and give many extra points
            sql = "Select id from likes " +
                `WHERE liker_id = ${infos.id} and liked_id = ${id}`;
            connection.query(sql, (err, res) => {
                const dist = geolib.getDistance(
                    {latitude: infos.latitude, longitude: infos.longitude},
                    {latitude: pos_res[0].latitude, longitude: pos_res[0].longitude}
                );
                if (err) throw err;
                else matchingScore += 200 * res.length;
                resolve({
                    score: matchingScore,
                    dist
                });
            })
        })
    });
}

function getAgeScore(id, infos, tag_res, pos_res) {
    return new Promise(resolve => {
        const dist = geolib.getDistance(
            {latitude: infos.latitude, longitude: infos.longitude},
            {latitude: pos_res[0].latitude, longitude: pos_res[0].longitude}
        );

       const sql = "Select age from infos " +
           `WHERE user_id = ${infos.id};`;
       connection.query(sql, (err, res) => {
           if (err) throw err;
           resolve ({
               score: res[0].age,
               dist
           });
       })
    });
}

function getDistanceScore(id, infos, tag_res, pos_res) {
    return new Promise(resolve => {

            if (infos.latitude && infos.longitude && pos_res[0].latitude && pos_res[0].longitude) {
                const dist = geolib.getDistance(
                    {latitude: infos.latitude, longitude: infos.longitude},
                    {latitude: pos_res[0].latitude, longitude: pos_res[0].longitude}
                );
                resolve ({
                    score: dist,
                    dist
                });
            }
        })
}

function syncDistanceScore(id, infos, tag_res, pos_res) {
    if (infos.latitude && infos.longitude && pos_res[0].latitude && pos_res[0].longitude) {
        return (geolib.getDistance(
            {latitude: infos.latitude, longitude: infos.longitude},
            {latitude: pos_res[0].latitude, longitude: pos_res[0].longitude}
        ));
    }
}

function getPopularityScore(id, infos, tag_res, pos_res) {
    return new Promise(resolve => {
    resolve({
        score: infos.popularity,
        dist: geolib.getDistance(
            {latitude: infos.latitude, longitude: infos.longitude},
            {latitude: pos_res[0].latitude, longitude: pos_res[0].longitude}
        )
    });
    })
}

function getInterestsScore(id, infos, tag_res, pos_res) {
    return new Promise(resolve => {

        const sql = "SELECT tag from interests " +
            `WHERE user_id = ${infos.id}`;
        connection.query(sql, (err, res) => {
            // if (err) throw err;

            //Filter one array of tags with the other one to get nb of common tags
            const filtered_array = tag_res.filter((tag) => {
                for(let j = 0; j < res.length; j++) {
                    if (tag.tag === res[j].tag)
                        return true;
                }
                return false;
            });
            resolve({
                score: filtered_array.length,
                dist: geolib.getDistance(
                    {latitude: infos.latitude, longitude: infos.longitude},
                    {latitude: pos_res[0].latitude, longitude: pos_res[0].longitude}
                )
            });
        })
    });
}

function isBlocked_liked_or_disliked(id, user) { //need to add dislike
    return new Promise(resolve => {
        let sql = "SELECT id from blocks " +
            `WHERE (blocker_id = ${id} AND blocked_id = ${user.id}) OR (blocked_id = ${id} AND blocker_id = ${user.id});`;
        connection.query(sql, (err, res) => {
            if (err) throw err;
            if (res.length)
                resolve(res.length);
           sql = "SELECT id from likes " +
               `WHERE (liker_id = ${id} AND liked_id = ${user.id});`;
            connection.query(sql, (err, res) => {
                if (err) throw err;
                if (res.length)
                    resolve(res.length);
                sql = "Select id from dislikes " +
                    `WHERE (disliker_id = ${id} AND disliked_id = ${user.id});`;
                connection.query(sql, (err, res) => {
                    if (err) throw err;
                    resolve(res.length);
                })
            })
        })
    })
}

async function  filters_past(id, result) {
    return new Promise (resolve => {
        let to_remove = [];
        for (let i = 0; i < result.length; i++) {
            isBlocked_liked_or_disliked(id, result[i])
                .then(res => {
                    if (res) { //splicing more than 1 element changes indexes, need to store it and splice in reverse order
                        to_remove.push(i);
                    }
                    if (i == result.length - 1) {
                      to_remove.sort((a, b) => {return (a - b)});
                        for (let j = to_remove.length - 1; j >= 0; j--) {
                            result.splice(to_remove[j], 1);
                        }
                        resolve(result);
                    }
                });
        }
    })
}

async function filters_interests(tags_array, result) {
    return new Promise((resolve => {
        let to_remove = [];
        let tags_array_filtered = [];
        for (let i = 0; i < result.length; i++) {
            const sql = "select tag from interests " +
                `Where user_id = ${result[i].id}`;
            connection.query(sql, (err, res) => {
                if (err) throw err;
                    tags_array_filtered = tags_array.filter((tag) => {
                        for(let j = 0; j < res.length; j++) {
                            if (tag.name === res[j].tag)
                                return true;
                        }
                        return false;
                    });
                    if (tags_array_filtered.length < tags_array.length) {
                        to_remove.push(i);
                    }
                if (i == result.length - 1) {
                    for (let j = to_remove.length - 1; j >= 0; j--) {
                        result.splice(to_remove[j], 1);
                    }
                    resolve(result);
                }
            })
        }
    }))
}

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
        distanceMin: req.body.distanceMin,
        distanceMax: req.body.distanceMax,
        interests: req.body.interests
    };

    let sort_function;
            //get sexuality infos from user
            const sql_user_info = "SELECT sexuality, gender FROM infos " +
                `WHERE user_id = ${user.id}`;
            connection.query(sql_user_info, (err, result) => {
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
            sql_main_query += `AND i.age >= ${request.ageMin} AND i.age <= ${request.ageMax} AND i.popularity >= ${request.popularityMin} and i.popularity <= ${request.popularityMax};`;
            connection.query(sql_main_query, (err, result) => {
                    if (err) throw err;
                    const tag_sql = "SELECT tag from interests " +
                        `WHERE user_id = ${user.id}`;
                    connection.query(tag_sql, (err, tag_res) => {
                        let sql_pos = "SELECT latitude, longitude FROM infos " +
                            `WHERE user_id = ${user.id}`;
                        connection.query(sql_pos, (err, pos_res) => {
                            //Filter by distance
                            result = result.filter((user) => {
                                const score = syncDistanceScore(user.id, user, tag_res, pos_res);
                                return (score / 1000 >= request.distanceMin && score / 1000 <= request.distanceMax);
                            });

                            filters_past(user.id, result)
                                .then ((result) => {
                                    filters_interests(request.interests, result)
                                        .then((result) => {
                                            if (result.length === 0)
                                                return res.json({});
                                            for (let i = 0; i < result.length; i++) {
                                                switch (request.sort) {
                                                    case "relevance":
                                                        sort_function = getRelevanceScore;
                                                        break;
                                                    case "age":
                                                        sort_function = getAgeScore;
                                                        break;
                                                    case "distance":
                                                        sort_function = getDistanceScore;
                                                        break;
                                                    case "popularity":
                                                        sort_function = getPopularityScore;
                                                        break;
                                                    case "interests":
                                                        sort_function = getInterestsScore;
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
                                                                        if (request.order == "desc")
                                                                            return(second.matchScore.score - first.matchScore.score);
                                                                        else
                                                                            return(first.matchScore.score - second.matchScore.score)
                                                                    });
                                                                    return res.json(result.map((item) => {return({
                                                                        id: item.id,
                                                                        matchScore: item.matchScore.score,
                                                                        dist: item.matchScore.dist
                                                                    })}));
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