
const mysql = require('mysql');
const jwt_check = require('../utils/jwt_check');
const notifs = require('../utils/notifs');

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

module.exports = (io) => {
  io.sockets.on('connection', socket => {
    socket.on('room', (room) => {
      socket.join(room);
    });

    socket.on('send message', (room) => {
      io.sockets.in(room).emit('new message');
    });

    socket.on('disconnect', (data) => {
      socket.disconnect();
    });
  })
};
