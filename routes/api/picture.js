const express = require('express');
const router = express.Router();
const jwt_check = require('../../utils/jwt_check');
const mysql = require('mysql');

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

router.delete('/:pic_nb', (req, res) =>{

  const user = jwt_check.getUsersInfos(req.headers.authorization);
  if (user.id === -1) {
    return res.status(401).json({error: 'unauthorized access'});
  }
console.log(user.id);

  if (!req.params.pic_nb || req.params.pic_nb > 5) {
    return res.status(400).json({pic_nb: "Le numero de la photo est incorrect"});
  }
  let sql = `SELECT pic${req.params.pic_nb} as pic FROM photos ` +
    `WHERE user_id = ${user.id};`;
  connection.query(sql, (err, pic) => {
    if (err) throw err;
    sql = `UPDATE photos set pic${req.params.pic_nb} = NULL WHERE user_id = ${user.id};`;
    connection.query(sql, (err) => {
      if (err) throw err;
      let pic_to_del = pic[0].pic;
      console.log(pic_to_del);
      sql = `UPDATE infos set profile_pic = NULL WHERE user_id = ${user.id} and profile_pic = "${pic_to_del}";`;
      console.log(sql);
      connection.query(sql, (err) => {
        if (err) throw err;
        return res.json();
      })
    })
  })
});

module.exports = router;
