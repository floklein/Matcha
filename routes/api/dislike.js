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
        disliked: req.body.disliked
    };
    let res_err = {};

    if (typeof response.disliked == 'undefined' || response.disliked == "") {
        res_err = {
            ...res_err,
            disliked: "Le compte à disliker est requs"
        };
        return res.status(400).json(res_err);
    }
    else {
        //Check if 2 users are the same
        if (req.user.id === response.disliked) {
            res_err = {
                ...res_err,
                disliked: "Un utilisateur ne peut se disliker lui-même"
            };
            return res.status(400).json(res_err);
        }
        else {
            //Check if disliked exists
            let sql = `SELECT id from users WHERE id = ${response.disliked}`;
            connection.query(sql, (err, result) => {
                if (result && result.length == 0) {
                    res_err = {
                        ...res_err,
                        disliked: "Le compte à disliker non trouvé"
                    };
                    return res.status(400).json(res_err);
                }
                else {
                    if (err) throw err;
                    //Check if already disliked
                    sql = `SELECT * FROM dislikes WHERE disliker_id = ${req.user.id} AND disliked_id = ${response.disliked}`;
                    connection.query(sql, (err, result) => {
                        if (result && result.length != 0) { //If already disliked, do nothing
                            return res.json();
                        }
                        else {  //Else, dislike
                            sql = `INSERT INTO dislikes(disliker_id, disliked_id) VALUES(${req.user.id}, ${response.disliked})`;
                            connection.query(sql, (err, result) => {
                                connection.query(sql, (err, resp) => {
                                    if (err) throw err;
                                    console.log(resp);
                                    return res.json();
                                })
                            })
                        }
                    })
                }
            })
        }
    }
});

module.exports = router;