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


//API to call when visiting a profile to update visits and give popularity to visited profile
router.get('/', passport.authenticate('jwt', {session: false}), (req, res) => {
    const visited_id = req.body.visited;
    let response = {};

    if (typeof visited_id === 'undefined' || visited_id == 0) {
        response = {
            ...response,
            profile: "L'id est requis."
        };
        return res.status(400).json(response)
    }
    if (visited_id === req.params.id) { //visiter self_visit, do nothing
        return;
    }

    let sql = `SELECT id FROM users WHERE id = ${visited_id};`;
    connection.query(sql, (err, resp) => {
        if (err) throw err;
        if (!res) {
            response = {
                ...response,
                id: "L'utilisateur n'existe pas."
            };
            return res.status(400).json(response)
        }
        else { //if everything is fine, check if querying user already visited
            sql = "Select * from visits " +
                `WHERE visiter_id = ${req.user.id} AND visited_id = ${visited_id};`;
            connection.query(sql, (err, resp) => {
                if (err) throw err;
                if (!resp || !resp.length) { //If not found, insert new visit
                    sql = "INSERT INTO visits(visiter_id, visited_id, time)" +
                        `VALUES(${req.user.id}, ${visited_id}, now());`;
                    connection.query(sql, (err, resp) => {
                        if (err) throw err;
                        sql = "UPDATE infos SET popularity = popularity + 1 " +
                            `WHERE user_id = ${visited_id};`;
                        connection.query(sql, (err, resp) => {
                            if (err) throw err;
                            return res.json('');
                        })
                    })
                }
                else { //Check is visit is within the last 24 hours and update time if before yesterday
                    sql = "UPDATE visits " +
                        "SET time = now()" +
                        `WHERE visiter_id = ${req.user.id} AND visited_id = ${visited_id} AND time < (now() - INTERVAL 1 DAY);`;
                    connection.query(sql, (err, resp) => {
                        if (err) throw err;
                        if (resp.affectedRows) {
                            sql = "UPDATE infos SET popularity = popularity + 1 " +
                                `WHERE user_id = ${visited_id};`;
                            connection.query(sql, (err, resp) => {
                                if (err) throw err;
                            })
                        } //If it was changed, add popularity
                        return res.json('');
                    })
                }
            })
        }
    })
});

module.exports = router;