[{
	id: '1',
	name: 'Sedim',
	room: 'The room'
}];

class Users {
	constructor() {
		this.users = [];
	}
	//Methods
	addUser(id, name, room) {
		var user = { id, name, room };
		this.users.push(user);
		return user;
	}

	removeUser(id) {
		var user = this.getUser(id);
		if (user) {
			this.users = this.users.filter((user) => user.id !== id)
		}
		return user;
	}

	getUser(id) {
		var users = this.users.filter(function(user) {
			return user.id === id;
		});
		//console.log('typeof', typeof(users))
		//Return it as an object and NOT the array
		return users[0];
	}

	getUserList(room) {
		//Below will filter given the room and load roomArray when
		//document.room === room
		var users = this.users.filter(function(user) {
			return user.room === room;
		});
		//Below will iterate through the every element ofarray
		//and load every user.name into roomUsersNames
		var namesArray = users.map(function(user) {
			return user.name
		});
		return namesArray;
	}
}

module.exports = { Users };
