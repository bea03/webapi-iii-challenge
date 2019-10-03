// code away!
//imports:
const express = require('express');
const helmet = require('helmet');
const postRouter = require('./posts/postRouter.js');
const userRouter = require('./users/userRouter.js');

//custom middleware
function logger(req, res, next) {
    const method = req.method;
    const url = req.url;
    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date
    const date = new Date(Date.now());
    console.log(`${date} you made a ${method} request to ${url}`);
    next(); //no res so you need next to move on
}

//create a server
const server = express();

//teach express how to read json
server.use(express.json());

//applying logger globally per instructions
server.use(logger);

//third-party security helmet must import it
server.use(helmet());

//server to use routes
server.use('/api/posts', logger, postRouter);
server.use('/api/users', logger, userRouter);

server.get('/', (req, res) => {
    res.send(`
      <h2>Building an API using a Node.js and Express Middleware</h>
      <p>Welcome to the Lambda Building an API using a Node.js and Express Middleware</p>
    `);
  });

  //setting up if want to do Heroku, process.env.PORT is taking the port that heroku assigns it to run
  const port = process.env.PORT || 8000;
  server.listen(port, () => {
    console.log(`\n*** Server Running on Port: ${port} ***\n`);
  });