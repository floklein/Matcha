const mysql = require('mysql');
const faker = require('faker');
const axios = require('axios');

let cities = require('./cities');


let connection = mysql.createConnection({
  host: 'localhost',
  port: '3306',
  user: 'root',
  password: 'root',
  database: 'matcha',
});

function additional_infos(id, bio, sexuality, age, latitude, longitude, popularity, profilePic) {
  return new Promise((resolve) => {
  //Set user infos
    let info = {
      bio,
      sexuality,
      age,
      latitude,
      longitude,
      popularity,
      profilePic,
    };
    let res_err = {};
    let error = false;

    const sql = `SELECT id from users WHERE id = ${id}`;
    connection.query(sql, (err, result) => {
      if (result && result.length == 0) {
        res_err = {
          ...res_err,
          id: "Utilisateur non trouvé"
        };
        resolve(res_err);
      }
      else {
        if (typeof info.bio == 'undefined' || info.bio == "") {
          res_err = {
            ...res_err,
            bio: "La bio est requise"
          };
          error = true
        }
        else if (info.bio.length > 420) {
          res_err = {
            ...res_err,
            bio: "La bio doit faire moins de 420 caractères"
          };
          error = true
        }
      }
      if (typeof info.sexuality == 'undefined' || (info.sexuality != "bisexual" && info.sexuality != "heterosexual" && info.sexuality != "homosexual")) {
        res_err = {
          ...res_err,
          sexuality: "La sexualité est incorrecte"
        };
        error = true
      }
      if (typeof info.age == 'undefined' || info.age == "" || isNaN(info.age)) {
        res_err = {
          ...res_err,
          age: "L'age est incorrect"
        };
        error = true
      }
      if (typeof info.latitude == 'undefined' || info.latitude == "") {
        res_err = {
          ...res_err,
          latitude: "La latitude est incorrecte"
        };
        error = true
      }
      if (typeof info.longitude == 'undefined' || info.longitude == "") {
        res_err = {
          ...res_err,
          longitude: "La longitude est incorrecte"
        };
        error = true
      }
      if (typeof info.popularity == 'undefined' || info.popularity == "") {
        res_err = {
          ...res_err,
          popularity: "La popularité est incorrecte"
        };
        error = true
      }
      if (typeof info.profilePic == 'undefined' || info.profilePic == "") {
        res_err = {
          ...res_err,
          profilePic: "La photo de profil est requise"
        };
        error = true
      }
      if (error) {
        resolve(res_err);
      }
      else {
        const sql2 = `UPDATE infos SET bio = "${info.bio}", sexuality = "${info.sexuality}", age = ${info.age} , latitude = ${info.latitude}, longitude = ${info.longitude}, popularity = ${info.popularity}, profile_pic = "${info.profilePic}"` +
          `WHERE user_id = ${id}`;
        connection.query(sql2, (err) => {
          if (err) throw (err);
        })
      }
      resolve(id);
    })
  });
}

function fill_db(data, pos_array) {
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
    const popularity = Math.random() * 100;
    const profilePic = data.picture.large;
    const pic2 = faker.image.avatar();
    const pic3 = faker.image.avatar();
    const pic4 = faker.image.avatar();
    const pic5 = faker.image.avatar();
    const random_city_pos = Math.floor(Math.random() * pos_array.length);
    const longitude = pos_array[random_city_pos][pos_array[random_city_pos].length - 1] + (Math.bool ? 0.02 : -0.02) * Math.random();
    const latitude = pos_array[random_city_pos][pos_array[random_city_pos].length - 2] + (Math.bool ? 0.02 : -0.02) * Math.random();;

    axios.post('http://localhost:5000/api/user/register', {
      email,
      lastName,
      firstName,
      username,
      password,
      confirm,
      gender,
      nomail: true
    })
      .then(response => {
        const id = response.data;
        additional_infos(id, bio, sexuality, age, latitude, longitude, popularity, profilePic)
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
  let position_array = [];
  let cities_list = cities.cities;

  cities_list = cities_list.split("\n");
  for (let j = 0; j < cities_list.length; j++)
    position_array[j] = cities_list[j].split("\t");
  axios.get(`https://randomuser.me/api?nat=fr&results=1000`)
    .then(res => {
      for (let i = 0; i < 1000; i++) {
        promises.push(fill_db(res.data.results[i], position_array));
      }
      Promise.all(promises)
        .then(() => {
          connection.end();
        })
        .catch((err) => {
        });
    })
    .catch(err => {
    });
});
