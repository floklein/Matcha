module.exports = (io) => {
  io.sockets.on('connection', socket => {

    socket.on('room', (room) => {
      socket.join(room);
    });

    socket.on('send message', (room) => {
      io.sockets.in(room).emit('new message');
    });

    socket.on('disconnect', (data) => {
    });
  })
};