// the user model
var User = function(socket, name) {
	
	// every user stores its socket connection
	this.socket = socket;
	
	// user data
	this.data = {
		name: name
	};
};

module.exports = User;