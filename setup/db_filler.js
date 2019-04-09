const mysql = require('mysql');
const faker = require('faker');
const axios = require('axios');

let connection = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'root',
    database: 'matcha',
    multipleStatements: 'true'
})


connection.connect( (err) => {
    if (err) throw err
    console.log('You are now connected...');

        for (i = 0; i < 1000; i++) {
            const firstname = faker.name.firstName();
            const lastname = faker.name.lastName();
            const gender = (faker.random.boolean() ? "male" : "female");
            const password = "Qwerty123";
            const confirm = password;
            const email = faker.internet.email();
            const login = firstname;

            const bio = faker.lorem.sentences();
            const sexuality = (Math.random() > 0.8 ? "bisexual" : Math.random() > 0.8 ? "homosexual" : "heterosexual");

        axios.post('http://localhost:5000/api/user/signin', {
            email,
            lastname,
            firstname,
            login,
            password,
            confirm,
            gender
                })
            .then (response => {
                const newurl = "http://localhost:5000/api/user/additional/" + response.data;
                axios.post(newurl, {
                    bio,
                    sexuality
                })
                    .then (resp => {
                    })
                    .catch((error) => {
                        console.error(error.response);
                    })
                })
            .catch((error) => {
            //    console.error(error.response);
            })
        }
        connection.end();
})