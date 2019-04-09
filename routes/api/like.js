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
    }
    else {
        //Check if liker exists

        //Check if likee exists

        //Check if already liked

            //If already liked, unlike

            //Else, like
    }
});


module.exports = router;
