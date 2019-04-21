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
    let infos = {
        reported: req.body.reported
    };

    let response = {};

    if (typeof infos.reported == 'undefined' || infos.reported == "") {
        response = {
            ...response,
            reported: "Le compte bloqué est requis"
        };
        return res.status(400).json(response);
    }
    else {
        //Check if 2 users are the same
        if (req.user.id === infos.reported) {
            response = {
                ...response,
                reported: "L'utilisateur ne peut se bloquer lui-même"
            };
            return res.status(400).json(response);
        }
        else { //send report

        }
    }
});

module.exports = router;
