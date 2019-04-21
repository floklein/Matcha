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
})

connection.connect(function(err) {
    if (err) throw err
    console.log('You are now connected...')
})

function getMatchScore(id, infos, tag_res) { //To do: add distance
    return new Promise(resolve => {
        let matchingScore = 0;

        const sql = "SELECT tag from interests " +
            `WHERE user_id = ${infos.id}`;
        connection.query(sql, (err, res) => {
            if (err) throw err;

            //Filter one array of tags with the other one to get nb of common tags
            const filtered_array = tag_res.filter((tag) => {
                for(let j = 0; j < res.length; j++) {
                    if (tag.tag === res[j].tag)
                        return true;
                }
                return false;
            });
            matchingScore += 20 * filtered_array.length;

            //Add 0.1 matchingScore per Pop point
            matchingScore += 0.1 * infos.popularity;
            resolve(matchingScore);
        })
    });
}


router.get('/', passport.authenticate('jwt', { session: false}), (req, res) => {
    let res_err = {};

            //get sexuality infos from user
            const sql_user_info = "SELECT sexuality, gender FROM infos " +
                `WHERE user_id = ${req.user.id}`;
            connection.query(sql_user_info, (err, result) => {
                if (err) throw err;
                //if user is found, chose next query depending on sexuality and gender;
           let sql_main_query = "SELECT u.id, i.latitude, i.longitude, i.popularity " +
                "FROM users u INNER JOIN infos i on i.user_id = u.id WHERE ";
            if (result[0].sexuality == "heterosexual")
                sql_main_query += `i.gender != "${result[0].gender}" AND i.sexuality != "homosexual";`;
            else if (result[0].sexuality == "homosexual")
                sql_main_query += `i.gender = "${result[0].gender}" AND i.sexuality != "heterosexual";`;
            else
                sql_main_query += `(i.gender = "${result[0].gender}" AND i.sexuality != "heterosexual") OR (i.gender != "${result[0].gender}" AND i.sexuality != "homosexual");`;
            connection.query(sql_main_query, (err, result) => {
                    if (err) throw err;
                    const tag_sql = "SELECT tag from interests " +
                        `WHERE user_id = ${req.user.id}`;
                    connection.query(tag_sql, (err, tag_res) => {
                        for (let i = 0; i < result.length; i++) {
                            const matchScore = getMatchScore(req.user.id, result[i], tag_res)
                                .then((score) => {
                                    result[i] = {
                                        ...result[i],
                                        matchScore: score}
                                    console.log(result);
                                }
                            );
                        }
                    });
                })
            })
    });

module.exports = router;