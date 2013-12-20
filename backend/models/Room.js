var Line = require('./Line');

// the room model
var Room = function() {
	var lines = [];
	var users = [];

	// a user joins a room
	this.join = function(user) {
		// send the backlog to the user
		user.socket.emit('backlog', this.getBacklog());
		// save to the users array
		users.push(user);
		broadcastUsers();
	};

	// get the backlog
	this.getBacklog = function() {
		return lines;
	};

	// add a new line
	this.addLine = function(text, user) {
		// create a new line
		var line = new Line(text, user.data);
		// push line to the backlog
		lines.push(line);
		// broadcast line
		broadcastLine(line);
	};

	//remove user when disconnected, broadcast new userlist
	this.removeUser = function(user) {
		var idx = users.indexOf(user);
		users.splice(idx, 1);
		broadcastUsers();
	};

	// broadcast line to all users
	function broadcastLine(line) {
		users.forEach(function(user) {
			// emit line to the user
			user.socket.emit('message', line);
		});
	}

	function broadcastUsers() {
		var userdata = users.map(function(u) {
			return u.data;
		});

		users.forEach(function(user) {
			user.socket.emit('newUser', userdata);
		});
	}
};

module.exports = Room;
