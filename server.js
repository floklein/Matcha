const express = require('express');

const mysql = require('mysql');
const app = express();

const bodyParser = require('body-parser');

const session =  require('express-session') ;

app.use(session({ secret: 'mortparequipe', resave: false, saveUninitialized: true, }));

bodyParser.json();

app.use('/api/user', require('./routes/api/user'));
app.use('/api/like', require('./routes/api/like'));
app.use('/api/upload', require('./routes/api/upload'));


const port = 5000;

app.listen(port, () => `Server running on port ${port}`);