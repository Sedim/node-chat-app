var socket = io();

socket.on('connect', function () {//'connect' is built in
  console.log('Connected to server');

  // socket.emit('createMessage', {// client ==> Server
  //   from: 'Jen',
  //   text: 'Hey, what\'s up Sedim'
  // });

});

socket.on('disconnect', function() {//'disconnect is built in'
  console.log('Disconnected from server');
});

socket.on('newMessage', function(message) {// Client <== Server
  console.log('New Message:', message);
});
