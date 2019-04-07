const express = require('express');

const mysql = require('mysql');
const app = express();


app.use('/api/user', require('./routes/api/user'));


const port = 5000;

app.listen(port, () => `Server running on port ${port}`);