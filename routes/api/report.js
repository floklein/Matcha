const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

const mysql = require('mysql');
const jwt_check = require('../../utils/jwt_check');
const mail = require('../../template/email');

//Connect to db
let connection = mysql.createConnection({
    host: 'eu-cdbr-west-02.cleardb.net',
    port: '3306',
    user: 'bf02fec967e054',
    password: '4623bc9a',
    database: 'heroku_13dc1576b26f0ef',
});

connection.connect(function(err) {
    if (err) throw err
});



router.post('/', (req, res) => {

  const user = jwt_check.getUsersInfos(req.headers.authorization);
  if (user.id === -1) {
    return res.status(401).json({error: 'unauthorized access'});
  }

    let infos = {
        reported: req.body.reported
    };

    let response = {};

    if (typeof infos.reported === 'undefined' || infos.reported === "") {
        response = {
            ...response,
            reported: "Compte à bloquer requis"
        };
        return res.status(400).json(response);
    }
    else {
        //Check if 2 users are the same
        if (user.id === infos.reported) {
            response = {
                ...response,
                reported: "Vous ne pouvez pas vous bloquer vous-même"
            };
            return res.status(400).json(response);
        }
        else {
            //Check if reported exists
            sql = `SELECT id, username from users WHERE id = ?`;
            connection.query(sql, [infos.reported],(err, result0) => {
                if (result0 && result0.length == 0) {
                    if (user.id === infos.reported) {
                        response = {
                            ...response,
                            reported: "Utilisateur à bloquer non trouvé"
                        };
                        return res.status(400).json(response);
                    }
                }
                else {
                    //Check if already reported
                    sql = `SELECT * FROM reports WHERE reporter_id = ? AND reported_id = ?`;
                    connection.query(sql, [
                      user.id,
                      infos.reported
                    ], (err, result) => {
                        if (result && result.length !== 0) { //If already reported, do nothing
                            res.end();
                        }
                        else {  //Else, report
                            sql = `INSERT INTO reports(reporter_id, reported_id) VALUES(?, ?)`;
                            connection.query(sql, [
                              user.id,
                              infos.reported
                            ],(err, result) => {
                                const content = mail.templateEmail(`Bonjour Florent et Tanguy,`, "Voir l'utilisateur", "Signalement d'un faux compte", `${user.username} a signalé ${result0[0].username} comme étant un faux utilisateur.`, `http://localhost:3000/profile/${infos.reported}`);

                                let transporter = nodemailer.createTransport({
                                    service: 'gmail',
                                    auth: {
                                        user: 'matcha.fk.tbd@gmail.com',
                                        pass: 'Qwerty123-'
                                    }
                                });
                                let mailOptions = {
                                    from: 'Matcha <no-reply@matcha.com>',
                                    to: 'matcha.fk.tbd@gmail.com',
                                    subject: 'Signalement',
                                    html: content
                                };
                                transporter.sendMail(mailOptions);
                                res.end();
                            })
                        }
                    })
                }
            })
        }
    }
});

module.exports = router;