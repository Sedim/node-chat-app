//
const expect = require('expect');
const { Users } = require('./users');

describe('Users', () => {
	var usersObj;

	beforeEach(() => {
		// Please note that usersObj does not have a 'var' decleration
		usersObj = new Users();
		usersObj.users = [{
			id: '1',
			name: 'Mike',
			room: 'Room #1'
    }, {
			id: '2',
			name: 'Mary',
			room: 'Room #2'
    }, {
			id: '3',
			name: 'Jack',
			room: 'Room #1'
    }];
	});

	it('should add new user', () => {
		var usersObj1 = new Users();

		var user = {
			id: '123',
			name: 'Sedim',
			room: 'My Office'
		};
		var resUser = usersObj1.addUser(user.id, user.name, user.room);
		expect(usersObj1.users).toEqual([user]);
	});

	it('should remove user by id', () => {
		var id = '1'
		var removedUser = usersObj.removeUser(id)
		//console.log('Remove:', removedUser);
		expect(removedUser.id).toBe(id);
		expect(usersObj.users.length).toBe(2);
	});

	it('should NOT remove user by id.', () => {
		var id = '44'
		var removedUser = usersObj.removeUser(id)
		//console.log('Remove not:', removedUser);
		expect(removedUser).toNotExist();
	});

	it('should get the user by id and return an object that contains the user.', () => {
		var id = '2';
		var user = usersObj.getUser(id);
		//console.log('usersObj=', usersObj, 'and is of type ->', typeof(usersObj))
		//console.log('user=', user, 'and is of type ->', typeof(user));
		expect(user.id).toBe(id);
		expect(usersObj.users.length).toBe(3);
	});

	it('should NOT get the user by id and the return value should not exsist ->[][0]', () => {
		var id = '44';
		var user = usersObj.getUser(id);
		//console.log(user);
		expect(user).toNotExist();
	});

	it('should return user names in a room', () => {
		//var userList = usersObj; //.getUserList('Room #1');
		var namesArray = usersObj.getUserList('Room #1');
		expect(namesArray).toEqual(['Mike', 'Jack']);
	});

	it('should return user names in a room', () => {
		//var userList = usersObj; //.getUserList('Room #1');
		var namesArray = usersObj.getUserList('Room #2');
		expect(namesArray).toEqual(['Mary']);
	});
});
