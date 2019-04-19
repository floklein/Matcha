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



router.post('/', passport.authenticate('jwt', { session: false}), (req, res) => {
    let response = {
        blocked: req.body.blocked
    }

    let error = false;
    let res_array = [];

    if (typeof response.blocked == 'undefined' || response.blocked == "") {
        error = true;
        res_array.push({
            error: "blocked",
            errorText: "le compte blocké est requis"
        })
        res.status(400);
        res.end(JSON.stringify(res_array));
    }
    else {
        //Check if 2 users are the same
        if (req.user.id === response.blocked) {
            res_array.push({
                error: "blocked",
                errorText: "Les deux utilisateurs ne peuvent etre identiques"
            });
            res.status(400);
            res.end(JSON.stringify(res_array));
        }
        else {
                    //Check if blocked exists
                    sql = `SELECT id from users WHERE id = ${response.blocked}`;
                    connection.query(sql, (err, result) => {
                        if (result && result.length == 0) {
                            res_array.push({
                                error: "blocked",
                                errorText: "Utilisateur blocké non trouve"
                            });
                            res.status(400);
                            res.end(JSON.stringify(res_array));
                        }
                        else {
                            //Check if already liked
                            sql = `SELECT * FROM blocks WHERE blocker_id = ${req.user.id} AND blocked_id = ${response.blocked}`;
                            connection.query(sql, (err, result) => {
                                if (result && result.length != 0) { //If already liked, unlike
                                    //Check if already liked
                                    sql = `DELETE FROM blocks WHERE blocker_id = ${req.user.id} AND blocked_id = ${response.blocked}`;
                                    connection.query(sql, (err, result) => {
                                        res.end("unblock");
                                    })
                                }
                                else {  //Else, like
                                    sql = `INSERT INTO blocks(blocker_id, blocked_id) VALUES(${req.user.id}, ${response.blocked})`;
                                    connection.query(sql, (err, result) => {
                                        res.end("block");
                                    })
                                }
                            })
                        }
                    })
        }
    }
});

module.exports = router;
