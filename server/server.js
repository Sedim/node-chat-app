/**
 * Summary Socket methods:
 * Use io.emit ==> to send to all clients
 * Use socket.emit ==> to send back to a single client (the one that just emitted aka the current user)
 * Use socket.broadcast.emit ==> to send to all clients EXCEPT (the one that just emitted aka the current user)
 *
 * Also you can socket.join('room_one')
 * See  https://socket.io/docs/rooms-and-namespaces/
 * socket.leave('room_one')
 *
 * Here are the EQUIVALENTS (->) for using in a specific 'room'
 * io.emit ->  io.to('room_one').emit (emits to all users "clients" in room 'room_one')
 * socket.broadcast.emit -> socket.bradcast.to('room_one.).emit ( Brodcasts to all clients except the one using socket.broadcast aka the current client)
 * socket.emit -> (No need to do this one since it targets a single client)
 *
 */



const path = require('path'); //built in //path join: https://nodejs.org/dist/latest-v8.x/docs/api/path.html#path_path_join_paths
const express = require('express');
const app = express();
const server = require('http').createServer(app); // Required to use socket AND express()
var io = require('socket.io')(server);

const {
  generateMessage,
  generateLocationMessage
} = require('./utils/message');
const {
  isRealString
} = require('./utils/validation');
const publicPath = path.join(__dirname, '../public'); //This eleminates the ../ path and makes it a clean path
const port = process.env.PORT || 3000;

app.use(express.static(publicPath)); // Use the static public directory to serve html

//Register an event listener
//************ Begin socketIO Handling ***************
io.on('connection', (socket) => {
  console.log('new user connected');


  //**************** When Client connects 'connection', SERVER ('newMessage') ==> CLIENT#3 ('newMessage')
  // Use socket.emit back to emit ONLY to the emmiting client :
  //socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat room'));

  // **************** When Client connects 'connection', SERVER ('newMessage') ==> All OTHER Clients ('newMessage')
  // Use socket.broadcast.emit to emit to all clients except the original emmiter:
  //socket.broadcast.emit('newMessage', Server ==> ALL Clients except emmiting client
  //socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user has joined the chat room'));

  //3B
  socket.on('join', (loginFormParams, callback) => {
    if (!isRealString(loginFormParams.name) || !isRealString(loginFormParams.room)) {
      callback('Name and room name are required.');
    }
    // https://socket.io/docs/rooms-and-namespaces/
    socket.join(loginFormParams.room); // param.join = url: data from client
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat room'));
    socket.broadcast.to(loginFormParams.room).emit('newMessage', generateMessage('Admin', `${loginFormParams.name} has joined.`));


    callback();
  });


  // 1B
  // **************** on CLIENT#x 'createMessage', SERVER ('newMessage') ==> All Clients ('newMessage')
  //Use io.emit to broadcast to ALL clients including the response to the emmiting client: Server ==> all Clients
  //****>>type at the consol dev tool of browser(client) :
  // socket.emit('createMessage', {from: 'julie', text: 'hi there'});
  socket.on('createMessage', (newMessage, callback) => {
    console.log('createMessage', newMessage);
    io.emit('newMessage', generateMessage(newMessage.from, newMessage.text));
    callback('This is from the server'); // acknowledge back to the server
  });

  // 2B
  // **************** on CLIENT#x 'createLocationMessage', SERVER ('newLocationMessage') ==> All Clients ('newLocationMessage')
  socket.on('createLocationMessage', (coords) => {
    io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
  });

  // **************** If Client#x disconnects:
  socket.on('disconnect', function() {
    console.log('disconnected from client');
  });

}); // end io.on
//************End socketIO Handling ***************

server.listen(port, function() { // we are using the http node server directly  instead of express().
  console.log('Chat app listening on port ', port); //So: server.listen instead of app.listen is used for socketio
});
