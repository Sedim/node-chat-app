//Initial
var socket = io(); //Insatance of io sockets
//Standard socket calls
socket.on('connect', function() { //'connect' is built in
  console.log('Connected to server');
});

socket.on('disconnect', function() { //'disconnect is built in'
  console.log('Disconnected from server');
});


//you can type at the consol dev tool of browser : socket.emit('createMessage', {from: 'julie', text: 'hi there'});

//**************** CLIENT((newMessage) <== SERVER(newMessage)
//**************** Receiving message from server:
socket.on('newMessage', function(message) {
  //var formattedTime = moment(message.createdAt).format('h:mm a');
  //console.log('New Message:', message);
  var dd = jQuery('<dd></dd>'); // set up an unordered list tag
  dd.text(`${message.from} ${message.createdAt}: ${message.text}`); //Add the data to it

  jQuery('#messagelist').append(dd); // append it to the html and Display it
});

socket.on('newLocationMessage', function(message) {
  console.log('Location:', message);
  var dd = jQuery('<dd></dd>'); // set up an unordered list tag
  //Set up the Anchor
  var a = jQuery('<a target="_blank">Click here for my current location</a>');
  //The reason we are setting the stuff below instead of just adding it through a mask
  // is to prevent malicious injection into the URL by the user.
  dd.text(`${message.from} ${message.createdAt}: `); //construct the DOM
  a.attr('href', message.url); // Construct the DOM
  dd.append(a);
  console.log('Compsed DOM:', dd);
  jQuery('#messagelist').append(dd);
});

// socket.emit('createMessage', {
//   from: 'frank',
//   text: 'Hi'
// }, function(data) {
//   console.log('Got it', data);
// });

//**************** CLIENT(createMessage) ==> SERVER(createMessage) //
//**************** emiting a message to the server
// Disable the standard FORM behaviour and on click:

jQuery('#message-form').on('submit', function(e) {
  e.preventDefault();
  /**
   * [messageTextbox: Created to quickly change the messaage area]
   * @type {[Object]}
   */
  var messageTextbox = jQuery('[name=message]');

  //on click:
  socket.emit('createMessage', {
    from: 'User',
    text: messageTextbox.val() // Send the actual text
  }, function() { // Acknowledge receipt from the server function
    messageTextbox.val(''); // Clear the message form field after submision
  });
});


//**************** CLIENT(createLocationMessage) ==> SERVER(createLocationMessage)
//**************** Pressing and sending location info to the server
var locationButton = jQuery('#send-location');
locationButton.on('click', function() {
  console.log('Click');
  if (!navigator.geolocation) { // if there is no built in navigator in your broswer
    return alert('Geolocation not supported by you browser.');
  }

  //the disabled attribute is set to dissabled and disables the button
  locationButton.attr('disabled', 'disabled').text('Sending location...');


  navigator.geolocation.getCurrentPosition(function(position) {
    locationButton.removeAttr('disabled').text('Send location'); // Re-enables the button
    console.log(position);
    socket.emit('createLocationMessage', { // client ==> server
      latitude: position.coords.latitude, // Nvigate the DOM
      longitude: position.coords.longitude
    });
  }, function() {
    locationButton.removeAttr('disabled').text('Send location'); // Re-enables the button
    alert('Unable to fetch location.');
  });
});
//*****************
