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

//tested and working
router.get('/:id', (req, res) => {
    const id = req.params.id;     
        
    postDb.getById(id)
        .then(post => {
            console.log(post);
            if(typeof post === "undefined") {
               res.status(404).json({ message: "The post with the specified ID does not exist." });
            } else {
                res.status(200).json(post);
            }
        })
        .catch(err => {
            res.status(500).json({ error: "The post information could not be retrieved." });
        });
});

//tested and working
router.delete('/:id', (req, res) => {
    const id = req.params.id;
    
    postDb.getById(id)
        .then(post => {
            if(typeof post === "undefined") {
               res.status(404).json({ message: "The post with the specified ID does not exist." });
            } else {
                postDb.remove(id)
                    .then(records => {
                        res.status(200).json(records)
                    })
                    .catch(err => {
                        res.status(500).json({ error: "The post could not be removed" });
                    });
            }
        })
        .catch(err => {
            res.status(500).json({ error: "Couldn't retrieve Post by ID"});
        });
});

//tested and working
router.put('/:id', validatePost, (req, res) => {
    const id = req.params.id;
    console.log('put', id);
    const postData = req.body;
    console.log('putbody', postData);
    postDb.getById(id)
        .then(post => {
            if(typeof post === "undefined") {
               res.status(404).json({ message: "The post with the specified ID does not exist." });
            } else {
                postDb.update(id, postData)
                    .then(count => {
                        res.status(200).json(count);
                    })
                    .catch(err => {
                        res.status(500).json({ error: "The post information could not be modified." });
                    });
            }            
        })
        .catch(err => {
            res.status(500).json({ error: "Couldn't retrieve Post by ID"});
        });
});

// custom middleware
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

module.exports = router;