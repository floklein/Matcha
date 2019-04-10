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
        likee: req.query.likee
    }

    let error = false;
    let res_array = [];

    if (typeof response.likee == 'undefined' || response.likee == "") {
        error = true;
        res_array.push({
            error: "likee",
            errorText: "le compte likee est requis"
        })
        res.status(400);
        res.end(JSON.stringify(res_array));
    }
    else {
        //Check if 2 users are the same
        if (req.params.id === response.likee) {
            res_array.push({
                error: "id",
                errorText: "Les deux utilisateurs ne peuvent etre identiques"
            });
            res.status(400);
            res.end(JSON.stringify(res_array));
        }
        else {
            //Check if liker exists
            let sql = `SELECT id from users WHERE id = ${req.params.id}`;
            connection.query(sql, (err, result) => {
                if (result && result.length == 0) {
                    res_array.push({
                        error: "id",
                        errorText: "Liker non trouve"
                    });
                    res.status(400);
                    res.end(JSON.stringify(res_array));
                }
                else {
                    //Check if likee exists
                    sql = `SELECT id from users WHERE id = ${response.likee}`;
                    connection.query(sql, (err, result) => {
                        if (result && result.length == 0) {
                            res_array.push({
                                error: "id",
                                errorText: "Utilisateur like non trouve"
                            });
                            res.status(400);
                            res.end(JSON.stringify(res_array));
                        }
                        else {
                            //Check if already liked
                            sql = `SELECT * FROM likes WHERE liker_id = ${req.params.id} AND likee_id = ${response.likee}`;
                            connection.query(sql, (err, result) => {
                                if (result && result.length != 0) { //If already liked, unlike
                                    //Check if already liked
                                    sql = `DELETE FROM likes WHERE liker_id = ${req.params.id} AND likee_id = ${response.likee}`;
                                    connection.query(sql, (err, result) => {
                                        res.end("dislike");
                                    })
                                }
                                else {  //Else, like
                                    sql = `INSERT INTO likes(liker_id, likee_id) VALUES(${req.params.id}, ${response.likee})`;
                                    connection.query(sql, (err, result) => {
                                        res.end("like");
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
