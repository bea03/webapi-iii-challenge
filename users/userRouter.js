//imports
const express = require('express');
const userDb = require('./userDb.js');

//creating router
const router = express.Router();

//endpoints

//working
router.post('/', validateUser, (req, res) => {
    const user = req.body;
    userDb.insert(user)
        .then(user => {
            res.status(201).json(user);
        })
        .catch(err => {
            res.status(500).json({ error: "User was not added" });
        })
});

router.post('/:id/posts', (req, res) => {

});


//working
router.get('/', (req, res) => {
    userDb.get(req.query)
        .then(users => {
            res.status(200).json(users);
        })
        .catch(err => {
            res.status(500).json({ error: "Users could not be retrieved"});
        });
});

router.get('/:id', (req, res) => {

});

router.get('/:id/posts', (req, res) => {

});

router.delete('/:id', (req, res) => {

});

router.put('/:id', (req, res) => {

});

//custom middleware

function validateUserId(req, res, next) {
    const id = req.params.id;

    userDb.getById(id)
        .then(user => {
            if(typeof id === "undefined"){
                res.status(400).json({ message: "invalid user id" });
            } else {
                req.user = res.body;
                next();
            }
        })
  };
//working
function validateUser(req, res, next) { 
    const userData = req.body;
    if(!userData.name) {
        res.status(400).json({ message: "missing required name field" });
    } else if (!req.body){
        res.status(400).json({ message: "missing required text field" });
    }else {
        next();
    }
};

function validatePost(req, res, next) {
    const postData = req.body;
    if(!postData.text) {
        res.status(400).json({ message: "missing required text field" });
    } else if (!req.body){
        res.status(400).json({ message: "missing post data" });
    }else {
        next();
    }
};

function validatePostID(req, res, next) {
    const id = req.params.id;
    postDb.getById(id)
        .then(post => {
            if(typeof post === "undefined") {
                res.status(404).json({ message: "The post with the specified ID does not exist." });
             } else {
                 next();
             }
        })
        .catch(err => {
            res.status(500).json({ error: "Couldn't retrieve Post by ID"});
        }); 
}

module.exports = router;
