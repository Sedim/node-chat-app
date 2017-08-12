var socket = io();

socket.on('connect', function () {//'connect' is built in
  console.log('Connected to server');
});

socket.on('disconnect', function() {//'disconnect is built in'
  console.log('Disconnected from server');
});


//type at the consol dev tool of browser : socket.emit('createMessage', {from: 'julie', text: 'hi there'});

socket.on('newMessage', function(message) {// Server ==> Client
  console.log('New Message:', message);
  var dd = jQuery('<dd></dd>');
  dd.text(`==>${message.from}: ${message.text}`);

  jQuery('#messagelist').append(dd);
});

// socket.emit('createMessage', {
//   from: 'frank',
//   text: 'Hi'
// }, function (data) {
//   console.log('Got it', data);
// });

jQuery('#message-form').on('submit', function(e) {
  e.preventDefault();

  socket.emit('createMessage', {
      from: 'User',
      text: jQuery('[name=message]').val()
  }, function (){
  });



});
