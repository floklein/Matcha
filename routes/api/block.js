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
})

connection.connect(function(err) {
    if (err) throw err
    console.log('You are now connected...')
})



router.post('/:id', (req, res) => {
    let response = {
        blockee: req.query.blockee
    }

    let error = false;
    let res_array = [];

    if (typeof response.blockee == 'undefined' || response.blockee == "") {
        error = true;
        res_array.push({
            error: "blockee",
            errorText: "le compte blocké est requis"
        })
        res.status(400);
        res.end(JSON.stringify(res_array));
    }
    else {
        //Check if 2 users are the same
        if (req.params.id === response.blockee) {
            res_array.push({
                error: "blockee",
                errorText: "Les deux utilisateurs ne peuvent etre identiques"
            });
            res.status(400);
            res.end(JSON.stringify(res_array));
        }
        else {
            //Check if blocker exists
            let sql = `SELECT id from users WHERE id = ${req.params.id}`;
            connection.query(sql, (err, result) => {
                if (result && result.length == 0) {
                    res_array.push({
                        error: "blocker",
                        errorText: "blocker non trouve"
                    });
                    res.status(400);
                    res.end(JSON.stringify(res_array));
                }
                else {
                    //Check if blockee exists
                    sql = `SELECT id from users WHERE id = ${response.blockee}`;
                    connection.query(sql, (err, result) => {
                        if (result && result.length == 0) {
                            res_array.push({
                                error: "blockee",
                                errorText: "Utilisateur blocké non trouve"
                            });
                            res.status(400);
                            res.end(JSON.stringify(res_array));
                        }
                        else {
                            //Check if already liked
                            sql = `SELECT * FROM blocks WHERE blocker_id = ${req.params.id} AND blockee_id = ${response.blockee}`;
                            connection.query(sql, (err, result) => {
                                if (result && result.length != 0) { //If already liked, unlike
                                    //Check if already liked
                                    sql = `DELETE FROM blocks WHERE blocker_id = ${req.params.id} AND blockee_id = ${response.blockee}`;
                                    connection.query(sql, (err, result) => {
                                        res.end("unblock");
                                    })
                                }
                                else {  //Else, like
                                    sql = `INSERT INTO blocks(blocker_id, blockee_id) VALUES(${req.params.id}, ${response.blockee})`;
                                    connection.query(sql, (err, result) => {
                                        res.end("block");
                                    })
                                }
                            })
                        }
                    })
                }
            })
        }
    }
});

module.exports = router;
