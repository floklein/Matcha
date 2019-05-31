const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// app.use('/api/user', require('./routes/api/user'));
// app.use('/api/like', require('./routes/api/like'));
// app.use('/api/block', require('./routes/api/block'));
// app.use('/api/interests', require('./routes/api/interests'));
// app.use('/api/verify', require('./routes/api/verify'));
// app.use('/api/soulmatcher', require('./routes/api/soulmatcher'));
// app.use('/api/search', require('./routes/api/search'));
// app.use('/api/profile', require('./routes/api/profile'));
// app.use('/api/visit', require('./routes/api/visit'));
// app.use('/api/report', require('./routes/api/report'));
// app.use('/api/dislike', require('./routes/api/dislike'));
// app.use('/api/picture', require('./routes/api/picture'));
// app.use('/api/locations', require('./routes/api/locations'));
// app.use('/api/match', require('./routes/api/match'));
// app.use('/api/chat', require('./routes/api/chat'));
// app.use('/api/notifs', require('./routes/api/notifs'));
// app.use('/api/connection', require('./routes/api/connection'));


app.use(express.static('client/build'));


const port = process.env.PORT || 5000;

let server = app.listen(port);
global.io = require('socket.io')(server, {
  pingTimeout: 30000,
});


// require("./sockets/socketIO")(io);