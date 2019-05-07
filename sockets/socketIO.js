module.exports = (io) => {
  io.sockets.on('connection', socket => {
    console.log("Connected");

    socket.on('room', (room) => {
      console.log(room);
      socket.join(room);
    });

    socket.on('send message', (room) => {
      io.sockets.in(room).emit('new message');
    });

    socket.on('send notif', (room) => {
      console.log(`send notif to room ${room}`);
      io.sockets.in(room).emit('new notif');
    });

    socket.on('disconnect', (data) => {
      console.log("Disconnected");
    });
  })
};