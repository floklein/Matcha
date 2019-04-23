const express = require('express');
const router = express.Router();

const mysql = require('mysql');
const passport = require('passport');
const uuid = require('uuid');

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
    const sql = "SELECT DISTINCT tag  from interests";
    connection.query(sql, (err, resp) => {
        if (err) throw err;
        resp = resp.map((item) => {
            return({
                id: uuid.v4(),
                name: item.tag
            })
        })
        res.json(resp);
    })
});


//Create a new interest
router.post('/new', passport.authenticate('jwt', { session: false}), (req, res) => {
   let response = {
       tag: req.body.tag
   };
   if (typeof response.tag == "undefined" || response.tag == "") {
       const res_err = {
           tag: "Le tag est nécessaire"
       };
       return res.status(400).json(res_err);
   }
   else {
       sql = "INSERT INTO interests(user_id, tag)" +
           `VALUES(${req.user.id}, "${response.tag}")`;
       connection.query(sql, (err, result) => {
           if (err) throw err;
           res.end();
       })
   }
});


module.exports = router;