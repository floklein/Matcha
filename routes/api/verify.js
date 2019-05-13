const express = require('express');
const router = express.Router();
const mysql = require('mysql');


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


router.post('/', (req, res) => {
    let response = {
        id: req.body.id,
        code: req.body.code
    };
    let res_err = {};
    let error = false;

    //Check if both fields are filled
    if (typeof response.id === "undefined" || response.id == null) {
        res_err = {
            ...res_err,
            id: "L'ID de l'utilisateur est requis"
        };
        error = true;
    }
    if (typeof response.code === "undefined" || response.code == null) {
        res_err = {
            ...res_err,
            code: "Le code de vérification est requis"
        };
        error = true;
    }

    //If both fields are good, keep going
    if (!error) {
        let sql = "SELECT user_id, code FROM verified " +
        `WHERE user_id = ?;`;
        connection.query(sql, [response.id],(err, resp) => {
            if (err) throw err;

            //if both infos are valid, verify account
            if (resp[0].code === response.code && resp[0].user_id === parseInt(response.id)) {
                sql = "UPDATE verified " +
                    "SET status = true " +
                    `WHERE user_id = ${response.id};`;
                connection.query(sql, (err) => {
                    if (err) throw err;
                })
            }
            else {
                res_err = {
                    ...res_err,
                    match: "Lien invalide"
                };
                res.status(400).json(res_err);
            }
        })
    }
    // if previous error
    else {
        res.status(400).json(res_err);
    }
});

module.exports = router;