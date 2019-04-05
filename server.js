const express = require('express');

const mysql = require('mysql');
const app = express();
const nodeadmin = require('nodeadmin');

let connection = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'root'
})

connection.connect(function(err) {
    if (err) throw err
    console.log('You are now connected...')
})

app.use(nodeadmin(app));

app.get('/api/customers', (req, res) => {
  const customers = [
    {id: 1, firstName: 'John', lastName: 'Doe'},
    {id: 2, firstName: 'Brad', lastName: 'Traversy'},
    {id: 3, firstName: 'Mary', lastName: 'Swanson'},
  ];

  res.json(customers);
});

const port = 5000;

app.listen(port, () => `Server running on port ${port}`);