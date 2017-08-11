var socket = io();

socket.on('connect', function () {//'connect' is built in
  console.log('Connected to server');
});

socket.on('disconnect', function() {//'disconnect is built in'
  console.log('Disconnected from server');
});


//type at the consol dev tool of browser : socket.emit('createMessage', {from: 'julie', text: 'hi there'});
socket.on('newMessage', function(message) {// Client <== Server
  console.log('New Message:', message);
});
