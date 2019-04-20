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

const tags = ["Voyages", "Cinéma", "Randonnée", "Jeux_vidéos", "Séries", "Game_of_Thrones", "Breaking_Bad", "Nolan", "Tarantino", "Sports", "Football", "Handball", "Basket", "Golf", "Final_Fantasy", "Call_of_Duty", "Fifa", "Cuisine", "Italie", "Politique", "Poker", "Casino", "De_Niro", "DiCaprio", "Voitures", "Moto", "Tunning", "Dessin", "Litterature", "Tolkien", "Douglas_Adams", "H2G2", "42", "Informatique", "Peinture", "Harry_Potter", "Star_Wars", "Hobbits", "Lego", "Jeux_De_Société", "Catane", "7Wonders", "Mode", "Musique", "IlonaMitrecey", "Kmaro", "Lorie", "Beyonce", "MinilibX", "PSG"];


function create_tags(user_id) {
    return new Promise((resolve, reject) => {

        //Chose nb of tags to add for given user
        const nb_pics = Math.floor(Math.random() * 15);
        const arr_tags = [];
        //Get unique indexes to pick tags from
        for (let i = 0; i < nb_pics; i++) {
            let r = Math.floor(Math.random() * tags.length);
            if (arr_tags.indexOf(r) === -1) arr_tags.push(r);
        }
        for (let j = 0; j < arr_tags.length; j++) {
            let sql = "INSERT INTO INTERESTS(user_id, tag)" +
                `VALUES (${user_id}, "${tags[arr_tags[j]]}")`;
            connection.query(sql, (err, result) => {
                if (j = arr_tags.length - 1)
                    resolve(result);
            })
            }
        })
}


connection.connect((err) => {
    if (err) throw err;

    let promises = [];
    const sql = "Select Count(id) as tot from users";
    connection.query(sql, (err, result) => {
        for (i = 0; i < result[0].tot; i++) {
            promises.push(create_tags(i));
        }

        Promise.all(promises)
            .then(() => {
                connection.end();
            })
            .catch((err) => {
            )
    });
});
