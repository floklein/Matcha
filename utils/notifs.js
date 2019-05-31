const mysql = require('mysql');

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

module.exports = {
  postNotif: function postNotif(id, type, content, user_id, notifier_name) {
    let sql = "SELECT id from blocks " +
      `WHERE (blocker_id = ? AND blocked_id = ?) OR (blocked_id = ? AND blocker_id = ?)`;
    connection.query(sql, [
      user_id,
      id,
      user_id,
      id
    ],(err, res) => {
      if (err) throw err;
      if (res.length)
        return;
      sql = `SELECT ` + "`" + type  + "`" +  `as type from settings WHERE user_id = ?;`;
      connection.query(sql, [
        id
      ],(err, res) => {
        if (err) throw err;
        if (res[0].type) {
          io.sockets.to(`r${id}`).emit('new notif', {content, type});
          sql = "INSERT INTO notifs(user_id, type, content, notifier_name, time) " +
            `VALUES(?, ?, ?, ?, now());`;
          connection.query(sql, [
            id,
            type,
            content,
            notifier_name
          ],(err) => {
            if (err) throw err;
          })
        }
      });
    });
  }
};