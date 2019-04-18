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



router.get('/:id', (req, res) => {
    let res_array = [];


    //Check if user exists
    let sql = `SELECT id from users WHERE id = ${req.params.id}`;
    connection.query(sql, (err, result) => {
        if (err) throw err;
        if (result && result.length == 0) {
            res_array.push({
                error: "id",
                errorText: "Utilisateur non trouvé"
            });
            res.status(400);
            res.end(JSON.stringify(res_array));
        }
        else {
            //get sexuality infos from user
            const sql_user_info = "SELECT sexuality, gender FROM infos " +
                `WHERE user_id = ${req.params.id}`;
            connection.query(sql_user_info, (err, result) => {
                res.write(JSON.stringify(result));
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
                    res.end(JSON.stringify(result));
                })
            })
        }
    });
});

module.exports = router;