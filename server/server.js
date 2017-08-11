const path = require('path'); //built in //path join: https://nodejs.org/dist/latest-v8.x/docs/api/path.html#path_path_join_paths
const http = require('http');
const express = require('express');
const socketIO = require ('socket.io');

const publicPath = path.join(__dirname, '../public'); //This eleminates the ../ path and makes it a clean path
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);// this is needed to use sockets
var io = socketIO(server);


app.use(express.static(publicPath));

//Register an event listener
io.on('connection', (socket) => {
  console.log('new user connected')

  socket.on('disconnect', () =>{
    console.log('disconnected from client');
  });


});


server.listen(port, function () {// we are using the http server directly  instead of express().
  console.log('Chat app listening on port ', port); //So: server.listen instead of app.listen is used for socketio
});
