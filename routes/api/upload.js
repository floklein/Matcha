const express = require('express');
const router = express.Router();
const fs = require('fs');

const multer = require('multer');
const upload = multer({'../../client/public/photos'});
const uuid = require('uuid');
const jwt_check = require('../../utils/jwt_check');

router.post('/', upload.single('picture'), (req, res) =>{
    if(req.file) {
        const name = "../../client/public/photos" + req.params.id + '_' + uuid.v4();
        fs.rename('../../client/public/photos' + req.file.filename, name, (error) => {
        if (error) throw error;
        res.json({name: name})
        })
    }
    else throw 'error';
});

module.exports = router;
