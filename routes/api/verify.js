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
    let res_array = [];


    //Check if both fields are filled
    if (typeof response.id == "undefined" || response.id == null) {
        res_array.push({
            error: "id",
            errorText: "L'id de l'utilisateur est requis"
        });
    }
    if (typeof response.code == "undefined" || response.id == null) {
        res_array.push({
            error: "code",
            errorText: "Le code de vérification est requis"
        });
    }

    //If both fields are good, keep going
    if (!res_array.length) {
        let sql = "SELECT user_id, code FROM verified" +
        `WHERE user_id = ${response.id}`;
        connection.query(sql, (err, resp) => {
            if (err) throw err;


            //if both infos are valid, verify account
            if (resp.code === response.code && resp.id === response.id) {
                sql = "UPDATE verified" +
                    "SET status = 'true'" +
                    `WHERE user_id = ${response.id}`;
                connection.query(sql, (err) => {
                    if (err) throw err;
                })
            }

            else {
                res_array.push({
                    error: "match",
                    errorText: "Veuillez verifier le lien reçu par mail"
                });
                res.status(400).end(JSON.stringify(res_array));
            }
        })
    }
    // if previous error
    else {
        res.status(400).end(JSON.stringify(res_array));
    }
});

module.exports = router;