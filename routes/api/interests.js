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


//get All unique tags in used on the website

router.get('/getAll', (req, res) => {
    const sql = "SELECT DISTINCT tags from interests";
    connection.query(sql, (err, resp) => {
        if (err) throw err;
        res.end(JSON.stringify(resp));
    })
});


//Create a new interest
router.post('/new', passport.authenticate('jwt', { session: false}), (req, res) => {
   let response = {
       tag: req.body.tag
   };
   if (typeof response.tag == "undefined" || response.tag == "") {
       const res_array = {
           error: "tag",
           errorText: "Le tag est nécessaire"
       };
       res.status(400).end(JSON.stringify(res_array));
   }
   else {
       sql = "INSERT INTO interests(user_id, tag)" +
           `VALUES(${req.user.id}, "${response.tag}")`;
       connection.query(sql, (err, result) => {
           if (err) throw err;
           res.end(JSON.stringify(result));
       })
   }
});


module.exports = router;