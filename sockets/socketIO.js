module.exports = (io) => {
  io.sockets.on('connection', socket => {
    console.log("Connected");

    socket.on('room', (room) => {
      socket.join(room);
    });

    socket.on('send message', (room) => {
      io.sockets.in(room).emit('new message');
    });

    socket.on('disconnect', (data) => {
      console.log("Disconnected");
    });
  })
};