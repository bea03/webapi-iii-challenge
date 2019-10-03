// code away!
//imports:
const express = require('express');
const postRouter = require('./posts/postRouter.js');
const userRouter = require('./users/userRouter.js');
//create a server
const server = express();

//teach express how to read json
server.use(express.json());

//third-party security helmet
server.use(helmet());

//server to use routes
server.use('/api/posts', postRouter);
server.use('/api/users', userRouter);

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