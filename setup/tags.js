const mysql = require('mysql');

let connection = mysql.createConnection({
  host: 'eu-cdbr-west-02.cleardb.net',
  port: '3306',
  user: 'bf02fec967e054',
  password: '4623bc9a',
  database: 'heroku_13dc1576b26f0ef',
});

const tags = ["Voyages",
  "Cinéma",
  "Randonnée",
  "Jeux_vidéos",
  "Séries",
  "Game_of_Thrones",
  "Breaking_Bad",
  "Nolan",
  "Tarantino",
  "Sports",
  "Football",
  "Handball",
  "Basket",
  "Golf",
  "Final_Fantasy",
  "Call_of_Duty",
  "Fifa",
  "Cuisine",
  "Italie",
  "Politique",
  "Poker",
  "Casino",
  "De_Niro",
  "DiCaprio",
  "Voitures",
  "Moto",
  "Tunning",
  "Dessin",
  "Litterature",
  "Tolkien",
  "Douglas_Adams",
  "H2G2",
  "42",
  "Informatique",
  "Peinture",
  "Harry_Potter",
  "Star_Wars",
  "Hobbits",
  "Lego",
  "Jeux_De_Société",
  "Catane",
  "7Wonders",
  "Mode",
  "Musique",
  "IlonaMitrecey",
  "Kmaro",
  "Lorie",
  "Beyonce",
  "MinilibX",
  "Paris",
  "Kubrick",
  "Lecture",
  "PSG"];

function create_tags(user_id) {
  return new Promise((resolve) => {
    //Chose nb of tags to add for given user
    const nb_pics = Math.floor(Math.random() * 15);
    const arr_tags = [];
    //Get unique indexes to pick tags from
    for (let i = 0; i < nb_pics; i++) {
      let r = Math.floor(Math.random() * tags.length);
      if (arr_tags.indexOf(r) === -1) arr_tags.push(r);
    }
    if (!arr_tags.length)
      resolve(0);
    for (let j = 0; j < arr_tags.length; j++) {
      let sql = "INSERT INTO INTERESTS(user_id, tag)" +
        `VALUES (${user_id}, "${tags[arr_tags[j]]}")`;
      connection.query(sql, (err, result) => {
        if (err) resolve(err);
        if (j === arr_tags.length - 1)
          resolve(0);
      })
    }
    console.log(`User ID:${user_id} got ${nb_pics} new interests.`);
  });
}

connection.connect((err) => {
  if (err) throw err;

  let promises = [];
  const sql = "SELECT COUNT(id) AS tot FROM users";
  connection.query(sql, (err, result) => {
    for (let i = 1; i <= result[0].tot; i++) {
      promises.push(create_tags(i));
    }

    Promise.all(promises)
      .then(() => {
        connection.end();
      })
      .catch((err) => {
      });
  });
});