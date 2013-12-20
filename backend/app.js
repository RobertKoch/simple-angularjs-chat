var express = require('express'),
	http = require('http'),
	path = require('path'),
	io = require('socket.io').listen(1337),
	User = require('./models/User'),
	Room = require('./models/Room');

// Create a new room
var lobby = new Room();
var userCount = 0;

// listen for new connections
io.sockets.on('connection', function (socket) {

	// user connected so we create a new user
	var user = new User(socket, 'user #' + (++userCount));

	// let the user join the lobby
	lobby.join(user);

	// listen for new messages
	user.socket.on('message', function(data) {
		// add the incoming message
		lobby.addLine(data, user);
	});

	//listen for disconnect
	user.socket.on('disconnect', function(data) {
		lobby.removeUser(user);
	});
});

var app = express();

app.configure(function () {
	app.set('port', process.env.PORT || 3000);
	app.use(express.favicon());
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(app.router);
	app.use(express.static(path.join(__dirname, '../frontend')));
});

app.configure('development', function () {
	app.use(express.errorHandler());
});

http.createServer(app).listen(app.get('port'), function () {
	console.log("Express server listening on port " + app.get('port'));
});
