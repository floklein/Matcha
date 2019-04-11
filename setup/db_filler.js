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

function fill_db() {
    return new Promise((resolve, reject) => {
        const firstName = faker.name.firstName();
        const lastName = faker.name.lastName();
        const gender = (faker.random.boolean() ? "male" : "female");
        const password = "Qwerty123";
        const confirm = password;
        const email = faker.internet.email();
        const username = firstName;
        const bio = faker.lorem.sentences();
        const sexuality = (Math.random() > 0.8 ? "bisexual" : Math.random() > 0.8 ? "homosexual" : "heterosexual");
        const age = Math.floor(Math.random() * 40) + 18;

        axios.post('http://localhost:5000/api/user/register', {
            email,
            lastName,
            firstName,
            username,
            password,
            confirm,
            gender
        })
            .then (response => {
                const newurl = "http://localhost:5000/api/user/additional/" + response.data;
                axios.post(newurl, {
                    bio,
                    sexuality,
                    age
                })
                    .then (resp => {
                        connection.query("UPDATE validation SET validated = 1 WHERE user_id > 0", err => {
                            if (err) throw err;
                            resolve(resp);
                        });
                    })
                    .catch((error) => {
                        resolve(error);
                        // console.error(error.response);
                 //       return reject(error);
                    })
            })
            .catch((error) => {
                resolve(error);
                //    console.error(error.response);
            })
    })
}


connection.connect( (err) => {
    if (err) throw err
    console.log('You are now connected...');

        var promises = [];

        for (i = 0; i < 1000; i++) {
            promises.push(fill_db());
        }

        Promise.all(promises)
            .then (() =>{
        connection.end();
            })
            .catch((err) => {
    })
})
