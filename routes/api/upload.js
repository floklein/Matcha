const express = require('express');
const router = express.Router();
const fs = require('fs');

const multer = require('multer');
const upload = multer({dest: __dirname + '/uploads/pics'});
const uuid = require('uuid');

router.post('/:id', upload.single('picture'), (req, res) =>{
    if(req.file) {
        res.json(req.file);
        fs.rename(__dirname + '/uploads/pics/' + req.file.filename, __dirname + '/uploads/pics/' + req.params.id + '_' + uuid.v4(), (error) => {
        if (error) throw error;
        })
    }
    else throw 'error';
});

module.exports = router;
