
const mysql = require('mysql');
const jwt_check = require('../utils/jwt_check');
const notifs = require('../utils/notifs');

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
