const path = require('path'); //built in //path join: https://nodejs.org/dist/latest-v8.x/docs/api/path.html#path_path_join_paths
const http = require('http');
const express = require('express');
const socketIO = require ('socket.io');

const {generateMessage} = require('./utils/message');
const publicPath = path.join(__dirname, '../public'); //This eleminates the ../ path and makes it a clean path
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);// this is needed to use sockets
var io = socketIO(server);


app.use(express.static(publicPath));// Use the static public directory to serve html

//Register an event listener
//************ Begin socketIO Handling ***************
io.on('connection', (socket) => {
  console.log('new user connected')

// Use socket.emit  to emit only to the emmiting client :
//socket.emit('newMessage', Server ==> to the emmiting client
  socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat room'));
// Use socket.broadcast.emit to emit to all clients except the original emmiter:
//socket.broadcast.emit('newMessage', Server ==> ALL Clients except emmiting client
  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user has joined the chat room'));
//Use io.emit to broadcast to ALL clients including the response to the emmiting client: Server ==> all Clients
//****>>type at the consol dev tool of browser(client) :
// socket.emit('createMessage', {from: 'julie', text: 'hi there'});
// Server <== client
  socket.on('createMessage', (newMessage, callback)=> {
    console.log('createMessage', newMessage);
    io.emit('newMessage', generateMessage(newMessage.from, newMessage.text));
    callback('This is from the server');// acknowledge back to the server
  });

  socket.on('createLocationMessage', (coords) => {
    io.emit('newMessage', generateMessage('Admin',`${coords.latitude}, ${coords.longitude}`))
  });

  socket.on('disconnect', function (){
    console.log('disconnected from client');
  });

});// end io.on
//************End socketIO Handling ***************


server.listen(port, function () {// we are using the http node server directly  instead of express().
  console.log('Chat app listening on port ', port); //So: server.listen instead of app.listen is used for socketio
});
