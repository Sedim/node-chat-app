//Initial
var socket = io();//Insatance of io sockets
//Standard socket calls
socket.on('connect', function () {//'connect' is built in
  console.log('Connected to server');
});

socket.on('disconnect', function() {//'disconnect is built in'
  console.log('Disconnected from server');
});


//you can type at the consol dev tool of browser : socket.emit('createMessage', {from: 'julie', text: 'hi there'});
//**************** Receiving message from server:
socket.on('newMessage', function(message) {// Client <==Server
  console.log('New Message:', message);
  var dd = jQuery('<dd></dd>');// set up an unordered list tag
  dd.text(`==>${message.from}: ${message.text}`); //Add the data to it

  jQuery('#messagelist').append(dd);// appendit to the html and Display it
});

// socket.emit('createMessage', {
//   from: 'frank',
//   text: 'Hi'
// }, function (data) {
//   console.log('Got it', data);
// });

//**************** emiting a message to the server
// Client ==> Server
// Disable the standard FORM behaviour and on click:
jQuery('#message-form').on('submit', function(e) {
  e.preventDefault();
//on click:
  socket.emit('createMessage', {
      from: 'User',
      text: jQuery('[name=message]').val() // Send the actual text
   }, function (){ // Acknowledge receipt from the server function
  });
});

//**************** Pressing and sending location info
var locationButton = jQuery('#send-location');

locationButton.on('click', function () {
console.log('Click');
  if (!navigator.geolocation) {// if there is no built in navigator in your broswer
    return alert('Geolocation not supported by you browser.')
  }

  navigator.geolocation.getCurrentPosition(function (position) {
    console.log(position);
    socket.emit('createLocationMessage', {// client ==> server
      latitude: position.coords.latitude,// see the DOM
      longitude: position.coords.longitude
    });
  }, function () {
    alert('Unable to fetch location.');
  });
});
//*****************
