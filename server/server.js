//See comments at the end of this file
//Also Checkout https://socket.io/get-started/chat/ for reference
const path = require('path'); //built in //path join: https://nodejs.org/dist/latest-v8.x/docs/api/path.html#path_path_join_paths
const express = require('express'); // Server

//Our utilitities
const { generateMessage, generateLocationMessage } = require('./utils/message');
const { isRealString } = require('./utils/validation');
const { Users } = require('./utils/users'); // include the users.js class that we developed

const publicPath = path.join(__dirname, '../public'); //This eleminates the ../ path and makes it a clean path
const port = process.env.PORT || 3000; // for local and Heroku hosting

// Server and Socket
var app = express();
var server = require('http').createServer(app); // Required to use socket AND express()
var io = require('socket.io')(server); // Required for io to work

var users = new Users(); //instansiate users with Class User() see users.js

app.use(express.static(publicPath)); // Use the static public directory to serve html


//Register an event listener
//************ Begin socketIO Handling ***************
io.on('connection', (socket) => {
	console.log('new user connected');

	//3B  SERVER <== CLIENT ('join', loginFormParams, function(err))
	socket.on('join', (loginFormParams, callback) => {
		if (!isRealString(loginFormParams.name) || !isRealString(loginFormParams.room)) {
			return callback('Name and room name are required.'); // This will stop the rest of the code below for executing
		}

		socket.join(loginFormParams.room); // https://socket.io/docs/rooms-and-namespaces // params.join = url: data from client
		users.removeUser(socket.id); // Make sure to remove user before adding him again
		users.addUser(socket.id, loginFormParams.name, loginFormParams.room); // Add a user to the users list

		io.to(loginFormParams.room).emit('updateUserList', users.getUserList(loginFormParams.room)); // Update display of users in rooms on all clients

		socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat room')); //Server ==> to the just connected client
		socket.broadcast.to(loginFormParams.room).emit('newMessage', generateMessage('Admin', `${loginFormParams.name} has joined.`)); // Server ==> to ALL other clients
		callback();
	});
	// 1B
	// **************** on CLIENT#x 'createMessage', SERVER ('newMessage') ==> All Clients ('newMessage')
	//Use io.emit to broadcast to ALL clients including the response to the emmiting client: Server ==> all Clients
	//****>>type at the consol dev tool of browser(client) :
	// socket.emit('createMessage', {from: 'julie', text: 'hi there'});
	socket.on('createMessage', (newMessage, callback) => {
		console.log('createMessage', newMessage);
		var user = users.getUser(socket.id); //get the user name (for display purposes) that sent the message from the client

		if (user && isRealString(newMessage.text)) { //isRealString eleminates CR blank submittions such as spaces etc
			//io.emit('newMessage', generateMessage(user.name, newMessage.text));
			io.to(user.room).emit('newMessage', generateMessage(user.name, newMessage.text)); // send message to user room and also send his name
		}
		callback('This is from the server'); // acknowledge back to the server
	});

	// 2B
	// **************** on CLIENT#x 'createLocationMessage', SERVER ('newLocationMessage') ==> All Clients ('newLocationMessage')
	socket.on('createLocationMessage', (coords) => {
		var user = users.getUser(socket.id); //get the user name (for display purposes) that sent the message from the client
		if (user) {
			//io.emit('newMessage', generateMessage(user.name, newMessage.text));
			//io.to(user.room).emit('newMessage', generateMessage(user.name, newMessage.text)); // send message to user room and also send his name
			io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));
		}

	});

	// **************** When the  Client#x disconnects (or hit refresh page or close the browser page)
	socket.on('disconnect', function() {
		var user = users.removeUser(socket.id); // We have to remove the user from the userlist

		if (user) {
			io.to(user.room).emit('updateUserList', users.getUserList(user.room)); // // Also we have have to update the user display list on the client with the new userlist in the room the user was deleted
			io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left`)); // Finally Inform all clients in that room that the user has left
		}
		//console.log('disconnected from client');
		//
	});

}); // end io.on
//************End socketIO Handling ***************


//************ Start server on port# **************
server.listen(port, function() { // we are using the http node server directly  instead of express().
	console.log('Chat app listening on port ', port); //So: server.listen instead of app.listen is used for socketio
});



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

//**************** When Client connects 'connection', SERVER ('newMessage') ==> CLIENT#3 ('newMessage')
// Use socket.emit back to emit ONLY to the emmiting client :
//socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat room'));

// **************** When Client connects 'connection', SERVER ('newMessage') ==> All OTHER Clients ('newMessage')
// Use socket.broadcast.emit to emit to all clients except the original emmiter:
//socket.broadcast.emit('newMessage', Server ==> ALL Clients except emmiting client
//socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user has joined the chat room'));
