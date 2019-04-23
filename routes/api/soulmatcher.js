const express = require('express');
const router = express.Router();

const mysql = require('mysql');
const passport = require('passport');
const geolib = require('geolib');

//Connect to db
let connection = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'root',
    database: 'matcha'
})

connection.connect(function(err) {
    if (err) throw err
    console.log('You are now connected...')
})

function getRelevanceScore(id, infos, tag_res, pos_res) {
    return new Promise(resolve => {
        let matchingScore = 0;

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
            resolve(matchingScore);
        })
    });
}

function getAgeScore(id, infos, tag_res, pos_res) {
    return new Promise(resolve => {

       const sql = "Select age from infos " +
           `WHERE user_id = ${infos.id};`;
       connection.query(sql, (err, res) => {
           if (err) throw err;
           resolve (res[0].age);
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
                resolve (dist);
            }
        })
}

function getPopularityScore(id, infos, tag_res, pos_res) {
    return new Promise(resolve => {

    resolve(infos.popularity);
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
            resolve(filtered_array.length);
        })
    });
}

//FILTER MANDATORY: blocked, liked and disliked

router.get('/', passport.authenticate('jwt', { session: false}), (req, res) => {
    let request = {
        sort: req.body.sort,
        order: req.body.order,
        ageMin: req.body.ageMin,
        ageMax: req.body.ageMax,
        popularityMin: req.body.popularityMin,
        popularityMax: req.body.popularityMax
    };
    //Protect against empty or wrong values


    let res_err = {};
    let sort_function;

            //get sexuality infos from user
            const sql_user_info = "SELECT sexuality, gender FROM infos " +
                `WHERE user_id = ${req.user.id}`;
            connection.query(sql_user_info, (err, result) => {
                if (err) throw err;
                //if user is found, chose next query depending on sexuality and gender;
           let sql_main_query = "SELECT u.id, i.latitude, i.longitude, i.popularity " +
                "FROM users u INNER JOIN infos i on i.user_id = u.id WHERE ";
            if (result[0].sexuality == "heterosexual")
                sql_main_query += `i.gender != "${result[0].gender}" AND i.sexuality != "homosexual" `;
            else if (result[0].sexuality == "homosexual")
                sql_main_query += `i.gender = "${result[0].gender}" AND i.sexuality != "heterosexual" `;
            else
                sql_main_query += `(i.gender = "${result[0].gender}" AND i.sexuality != "heterosexual") OR (i.gender != "${result[0].gender}" AND i.sexuality != "homosexual") `;
            sql_main_query += `AND i.age >= ${request.ageMin} AND i.age <= ${request.ageMax} AND i.popularity >= ${request.popularityMin} and i.popularity <= ${request.popularityMax};`;
            connection.query(sql_main_query, (err, result) => {
                    if (err) throw err;
                    const tag_sql = "SELECT tag from interests " +
                        `WHERE user_id = ${req.user.id}`;
                    connection.query(tag_sql, (err, tag_res) => {
                        let sql_pos = "SELECT latitude, longitude FROM infos " +
                            `WHERE user_id = ${req.user.id}`;
                        connection.query(sql_pos, (err, pos_res) => {
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
                                const matchScore = sort_function(req.user.id, result[i], tag_res, pos_res)
                                    .then((score) => {
                                            result[i] = {
                                                ...result[i],
                                                matchScore: score
                                            };
                                            if (i === result.length - 1) {
                                                result.sort((first, second) => {
                                                    if (request.order == "desc")
                                                        return(second.matchScore - first.matchScore);
                                                    else
                                                        return(first.matchScore - second.matchScore)
                                                });
                                                return res.json(result.map((item) => {return({
                                                    id: item.id,
                                                    matchScore: item.matchScore
                                                })}));
                                            }
                                        }
                                    );
                            }
                        });
                    });
                })
            })
    });

module.exports = router;