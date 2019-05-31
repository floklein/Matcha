const express = require('express');
const router = express.Router();

const mysql = require('mysql');
const jwt_check = require('../../utils/jwt_check');

//Connect to db
let connection = mysql.createConnection({
    host: 'eu-cdbr-west-02.cleardb.net',
    port: '3306',
    user: 'bf02fec967e054',
    password: '4623bc9a',
    database: 'heroku_13dc1576b26f0ef',
});

connection.connect(function (err) {
    if (err) throw err;
});


//get All unique tags in used on the website

router.get('/getAll', (req, res) => {
    const sql = "SELECT DISTINCT tag from interests";
    connection.query(sql, (err, resp) => {
        if (err) throw err;
        resp = resp.map((item, i) => {
            return({
                id: i,
                name: item.tag
            })
        });
        res.json(resp);
    })
});


module.exports = router;