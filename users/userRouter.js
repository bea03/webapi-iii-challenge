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

//working
router.get('/:id', (req, res) => {
    const id = req.params.id;
    userDb.getById(id)
        .then(user => {
            if(typeof user === "undefined"){
                res.status(400).json({ message: "invalid user id" });
            } else {
                res.status(200).json(user);
            }
        })
        .catch(err => {
            res.status(500).json({ error: "User could not be retrieved" });
        });
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
            if(typeof user === "undefined"){
                res.status(400).json({ message: "invalid user id" });
            } else {
                req.user = res.body;
                next();
            }
        })
        .catch(err => {
            res.status(500).json({ error: "User could not be retrieved" });
        });
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

module.exports = router;
