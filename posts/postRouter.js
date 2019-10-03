//imports
const express = require('express');
const postDb = require('./postDb.js');


//creating the router
const router = express.Router();


//endpoints
router.get('/', (req, res) => {

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