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
  postNotif: function postNotif(id, type, content, user_id, notifier_name) {
    //TODO: verif data

    let sql = "SELECT id from blocks " +
      `WHERE (blocker_id = ${user_id} AND blocked_id = ${id}) OR (blocked_id = ${user_id} AND blocker_id = ${id})`;
    connection.query(sql, (err, res) => {
      if (err) throw err;
      if (res.length)
        return;
      io.sockets.to(`r${id}`).emit('new notif', {content, type});
      sql = "INSERT INTO notifs(user_id, type, content, notifier_name, time) " +
        `VALUES(${id}, "${type}", "${content}", "${notifier_name}", now());`;
      connection.query(sql, (err) => {
        if (err) throw err;
      })
    });
  }
};