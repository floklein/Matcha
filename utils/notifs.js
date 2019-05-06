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
  console.log('You are now connected...')
});

module.exports = {
  postNotif: function postNotif(id, type, content) {
    //TO DO : some checks

    const sql = "INSERT INTO notifs(user_id, type, content, time) " +
      `VALUES(${id}, "${type}", "${content}", now());`;
    connection.query(sql, (err) => {
      if (err) throw err;
    })
  }
};