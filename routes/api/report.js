const express = require('express');
const router = express.Router();

const mysql = require('mysql');
const jwt_check = require('../../utils/jwt_check');

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



router.post('/', (req, res) => {

  const user = jwt_check.getUsersInfos(req.headers.authorization);
  if (user.id === -1) {
    return res.status(401).json({error: 'unauthorized access'});
  }

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
        if (user.id === infos.reported) {
            response = {
                ...response,
                reported: "L'utilisateur ne peut se bloquer lui-même"
            };
            return res.status(400).json(response);
        }
        else {
            //Check if reported exists
            sql = `SELECT id from users WHERE id = ${infos.reported}`;
            connection.query(sql, (err, result) => {
                if (result && result.length == 0) {
                    if (user.id === infos.reported) {
                        response = {
                            ...response,
                            reported: "Utilisateur bloqué non trouvé"
                        };
                        return res.status(400).json(response);
                    }
                }
                else {
                    //Check if already liked
                    sql = `SELECT * FROM reports WHERE reporter_id = ${user.id} AND reported_id = ${infos.reported}`;
                    connection.query(sql, (err, result) => {
                        if (result && result.length != 0) { //If already reported, do nothing
                        }
                        else {  //Else, report
                            sql = `INSERT INTO reports(reporter_id, reported_id) VALUES(${user.id}, ${infos.reported})`;
                            connection.query(sql, (err, result) => {
                                res.end("");
                            })
                        }
                    })
                }
            })
        }
    }
});

module.exports = router;

