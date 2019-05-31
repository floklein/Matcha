const express = require('express');
const router = express.Router();

const connection = require('../../utils/sql_connection');


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