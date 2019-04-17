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

router.get('/getAll', (req, res) => {
    const sql = "SELECT DISTINCT tags from interests";
    connection.query(sql, (err, resp) => {
        if (err) throw err;
        res.end(JSON.stringify(resp));
    })

})




module.exports = router;