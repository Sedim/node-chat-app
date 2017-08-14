 // This function is used in server.js to add a time stamp to the message
 var generateMessage = (from, text) => {
   return {
     from,
     text,
     createdAt: new Date().getTime()
   };
 };

 // This function is used in server.js to add coordsdinates to
 // google maps url and form a new message.
 var generateLocationMessage = (from, latitude, longitude) => {
   return {
     from,
     url: `https://www.google.com/maps?q=${latitude},${longitude}`,
     createdAt: new Date().getTime()
   };
 };


 module.exports = {
   generateMessage,
   generateLocationMessage
 };
