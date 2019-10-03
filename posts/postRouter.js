//imports
const express = require('express');
const postDb = require('./postDb.js');


//creating the router
const router = express.Router();


//endpoints

//tested and working in insomnia returning all posts
router.get('/', (req, res) => {
    postDb.get(req.query)
        .then(posts => {
            res.status(200).json(posts);
        })
        .catch(err => {
            res.status(500).json({ error: "The posts information could not be retrieved." });
        });
});

router.get('/:id', (req, res) => {

});

router.delete('/:id', (req, res) => {

});

router.put('/:id', (req, res) => {

});

// custom middleware

function validatePostId(req, res, next) {

};

module.exports = router;