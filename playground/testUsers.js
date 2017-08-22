const { Users } = require('./users');

//Instansiate users with class Users
users = new Users();

newId = 1;
newName = "Sedim";
newRoom = "Room2";
//'1', 'Sedim', 'The room'
// add a user example

var resUser = users.addUser(newId, newName, newRoom);

console.log('added: ', resUser);

//List all users example
var list = users.getUserList();

console.log('First:', list);

// Add second
users.addUser('2', 'Andrew', 'Room 3');
users.addUser('3', 'Andrew4', 'Room 989988');

console.log('List stringified', JSON.stringify(users.getUserList(), null, 2));
console.log('list as an object', users.getUserList());
//Find a user
var id = 1;
var foundUser = users.getUserName(id);
console.log('FoundUser: ', foundUser);



//Delete a user:
var id = '2';
var newObj = users.removeUser(id);
console.log(newObj);

// //Delete a user
// var objList = users.getUserList();
// var name = 1;
// var user = objList.filter(function(document) {
// 	return document.id === id;
// });
// delete objList[id]
//

// var json = [{
// 		"id": "1",
// 		"name": "sedim",
// 		"room": "room1"
// 	},
// 	{
// 		"id": "2",
// 		"name": "sedim1",
// 		"room": "room12"
// 	}]
//
// console.log(json);
// var myjson = JSON.parse(json);
// console.log(JSON.stringify(json));
