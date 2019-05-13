const express = require('express');
const router = express.Router();
const jwt_check = require('../../utils/jwt_check');
const mysql = require('mysql');
const path = require('path');
const photos = require('../../utils/photos');
const fs = require('fs');

//Connect to db
let connection = mysql.createConnection({
  host: 'localhost',
  port: '3306',
  user: 'root',
  password: 'root',
  database: 'matcha'
});

const multer = require('multer');
const upload = multer({
                                dest: 'client/public/photos',
                                limits: {
                                  fileSize:5000000
                                },
                                fileFilter: function(req, file, cb)  {
                                  if (path.extname(file.originalname) !== ".png" && path.extname(file.originalname) !== ".jpg" && path.extname(file.originalname) !== ".jpeg")
                                    cb(null, false);
                                  else
                                    cb(null, true);
                                }
                              });
const uuid = require('uuid');

connection.connect(function (err) {
  if (err) throw err;
});


router.delete('/:pic_nb', (req, res) =>{
  const user = jwt_check.getUsersInfos(req.headers.authorization);
  if (user.id === -1) {
    return res.status(401).json({error: 'unauthorized access'});
  }

  if (!req.params.pic_nb || req.params.pic_nb > 5 || isNaN(req.params.pic_nb)) {
    return res.status(400).json({pic_nb: "L'ID de l'image est incorrect"});
  }
  let sql = `SELECT pic${req.params.pic_nb} as pic FROM photos ` +
    `WHERE user_id = ${user.id};`;
  connection.query(sql, (err, pic) => {
    if (err) throw err;
    sql = `UPDATE photos set pic${req.params.pic_nb} = NULL WHERE user_id = ${user.id};`;
    connection.query(sql, (err) => {
      if (pic[0].pic.substring(0, 1) === '/')
        fs.unlink('client/public' + pic[0].pic, () => {});
      if (err) throw err;
      let pic_to_del = pic[0].pic;
      sql = `UPDATE infos set profile_pic = '/photos/default.png' WHERE user_id = ${user.id} and profile_pic = "${pic_to_del}";`;
      connection.query(sql, (err) => {
        if (err) throw err;
        return res.json();
      })
    })
  })
});

router.post('/', upload.single('picture'), (req, res) => {
  const user = jwt_check.getUsersInfos(req.headers.authorization);
  if (user.id === -1) {
    return res.status(401).json({error: 'unauthorized access'});
  }

  if(req.file) {
    const magicNb = fs.readFileSync(req.file.path).toString('hex', 0, 4);
    if (!magicNb.match("ffd8") && magicNb !== "89504e47") {
      fs.unlink(req.file.path, () => {});
      return res.status(400).json({
        photo: "L'image ne semble pas être au format PNG ou JPEG"
      })
    }
    photos.moveLeftPhotos(user.id)
      .then (pic_nb => {
        if (pic_nb > 5)
          return res.json({
            picture: "Vous avez atteint la limite maximale de 5 images"
          });
        const sql = "UPDATE photos " +
          `SET pic${pic_nb + 1} = "/photos/${req.file.filename}" WHERE user_id = ${user.id};`;
        connection.query(sql, (err) => {
          if (err) throw err;
          return res.json();
        })
      });
  }
  else return res.status(400).json({
    photo: "Erreur de photo"
  });
});

router.post('/profile_pic/:pic_nb', (req, res) => {
  const user = jwt_check.getUsersInfos(req.headers.authorization);
  if (user.id === -1) {
    return res.status(401).json({error: 'unauthorized access'});
  }
  if (!req.params.pic_nb || req.params.pic_nb > 5 || isNaN(req.params.pic_nb)) {
    return res.status(400).json({pic_nb: "Le numero de l'image est incorrect"});
  }
  let sql = `SELECT pic${req.params.pic_nb} as pic FROM photos ` +
    `WHERE user_id = ${user.id};`;
  connection.query(sql, (err, pic) => {
    if (err) throw err;
    if (pic[0].pic !== null) {
      sql = `UPDATE infos SET profile_pic = "${pic[0].pic}" WHERE user_id = ${user.id};`;
      connection.query(sql, (err) => {
        if (err) throw err;
        return res.json();
      })
    }
    else {
      return res.status(400).json({pic: "L'image sélectionnée n'existe pas"})
    }
  })
});

module.exports = router;
