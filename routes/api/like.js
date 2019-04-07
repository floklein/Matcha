const express = require('express');
const router = express.Router();

router.post('/:id', (req, res) => {
    let response = {
        likee: req.query.likee
    }

    let error = false;
    let res_array = [];

    if (typeof response.likee == 'undefined' || response.likee == "") {
        error = true;
        res_array.push({
            error: "likee",
            errorText: "le compte likee est requis"
        })
    }
    else {
        //Check if liker exists

        //Check if likee exists

        //Check if already liked

            //If already liked, unlike

            //Else, like
    }
});
