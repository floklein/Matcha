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

function fill_db(data) {
  return new Promise((resolve, reject) => {
    const firstName = data.name.first.charAt(0).toUpperCase() + data.name.first.slice(1);
    const lastName = data.name.last.charAt(0).toUpperCase() + data.name.last.slice(1);
    const username = firstName + lastName;
    const email = faker.internet.email();
    const password = "Qwerty123";
    const confirm = password;
    const bio = faker.lorem.sentences();
    const gender = Math.random() > 0.9 ? 'other' : data.gender;
    const sexuality = (Math.random() > 0.8 ? "bisexual" : Math.random() > 0.8 ? "homosexual" : "heterosexual");
    const age = Math.floor(Math.random() * 40) + 18;
    const longitude = 3.113749 + (Math.random() > 0.5 ? 1 : -1) * Math.random() * 3.6;
    const latitude = 46.32 + (Math.random() > 0.5 ? 1 : -1) * Math.random() * 3.5;
    const popularity = Math.random() * 100;
    const profilePic = data.picture.large;
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
        axios.post("http://localhost:5000/api/user/infos/" + id, {
          bio,
          sexuality,
          age,
          latitude,
          longitude,
          popularity,
          profilePic
        })
          .then(response2 => {
            console.log('ID:' + id + ' user created.');

            let sql = "INSERT INTO photos(user_id, pic1, pic2, pic3, pic4, pic5)" +
              `VALUES(${id}, "${profilePic}", "${pic2}", "${pic3}", "${pic4}", "${pic5}");`;
            connection.query(sql, (err, res) => {
              if (err) throw err;
              connection.query("UPDATE verified SET status = 1 WHERE user_id = " + id, err => {
                if (err) throw err;
                resolve(response2);
              });
            });
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

  axios.get(`https://randomuser.me/api?nat=fr&results=1000`)
    .then(res => {
      for (let i = 0; i < 1000; i++) {
        promises.push(fill_db(res.data.results[i]));
      }
      Promise.all(promises)
        .then(() => {
          connection.end();
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch(err => {
      console.log(err);
    });
});
