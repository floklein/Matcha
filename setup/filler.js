const mysql = require('mysql');
const faker = require('faker');
const axios = require('axios');

let connection = mysql.createConnection({
  host: 'localhost',
  port: '3306',
  user: 'root',
  password: 'root',
  database: 'matcha',
});

function fill_db() {
  return new Promise((resolve, reject) => {
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const username = firstName + lastName;
    const email = faker.internet.email();
    const gender = (faker.random.boolean() ? "male" : "female");
    const password = "Qwerty123";
    const confirm = password;
    const bio = faker.lorem.sentences();
    const sexuality = (Math.random() > 0.8 ? "bisexual" : Math.random() > 0.8 ? "homosexual" : "heterosexual");
    const age = Math.floor(Math.random() * 40) + 18;
    const longitude = 2.2137 + (Math.random() > 0.5 ? 1 : -1) - Math.random() * 10;
    const latitude = 46.2276 + (Math.random() > 0.5 ? 1 : -1) - Math.random() * 20;
    const popularity = Math.random() * 100;
    const profilePic = faker.image.avatar();
    const pic2 = faker.image.avatar();
    const pic3 = faker.image.avatar();
    const pic4 = faker.image.avatar();
    const pic5 = faker.image.avatar();

    axios.post('http://localhost:5000/api/user/register', {
      email,
      lastName,
      firstName,
      username,
      password,
      confirm,
      gender
    })
      .then(response => {
        const id = response.data;
        const newurl = "http://localhost:5000/api/user/infos/" + response.data;
        axios.post(newurl, {
          bio,
          sexuality,
          age,
          latitude,
          longitude,
          popularity,
          profilePic
        })
          .then(resp => {
            let sql = "INSERT INTO photos(user_id, pic1, pic2, pic3, pic4, pic5)" +
                `VALUES(${response.data}, "${profilePic}", "${pic2}", "${pic3}", "${pic4}", "${pic5}");`;
            connection.query(sql, (err, response) => {
              if (err) throw err;
                connection.query("UPDATE verified SET status = 1 WHERE user_id = " + id, err => {
                    resolve(resp);
                });
            })
          })
          .catch((error) => {
            resolve(error);
          })
      })
      .catch((error) => {
        resolve(error);
      })
  })
}


connection.connect((err) => {
  if (err) throw err;

  let promises = [];

  for (i = 0; i < 1000; i++) {
    promises.push(fill_db());
  }

  Promise.all(promises)
    .then(() => {
      connection.end();
    })
    .catch((err) => {
    })
});
