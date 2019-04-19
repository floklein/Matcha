const express = require('express');

const mysql = require('mysql');
const app = express();
const bodyParser = require('body-parser');
const passport = require('passport');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(passport.initialize());

//Passport Config
require('./config/passport')(passport);

app.use('/api/user', require('./routes/api/user'));
app.use('/api/like', require('./routes/api/like'));
app.use('/api/block', require('./routes/api/block'));
app.use('/api/upload', require('./routes/api/upload'));
app.use('/api/interests', require('./routes/api/interests'));
app.use('/api/verify', require('./routes/api/verify'));
app.use('/api/soulmatcher', require('./routes/api/soulmatcher'));

const port = 5000;

app.listen(port, () => `Server running on port ${port}`);