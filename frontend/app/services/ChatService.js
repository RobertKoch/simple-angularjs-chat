Chat.App.factory('Chat', function($rootScope) {

    var socket = io.connect('http://127.0.0.1:1337');
    var messages = [];
    var users = [];

    socket.on('backlog', function (lines) {
        // nicht: array = data, weil die Controller sich eine Referenz von Array holen
        // und so die Referenz verloren geht!!!
        lines.forEach(function(line) {
            messages.push(line);
        });

        //angular sagen, dass neue daten da sind
        $rootScope.$apply();
    });

    socket.on('newUser', function (newUsers) {
      users.length = 0;
      newUsers.forEach(function(user) {
        users.push(user);
      });
      $rootScope.$broadcast('newUser');
      $rootScope.$apply();
    });

    socket.on('message', function (line) {
      messages.push(line);
      $rootScope.$broadcast('newMessage');
      $rootScope.$apply();
    });

    return {
      getAll: function() {
        return messages;
      },
      getUsers: function () {
        return users;
      },
      sendMessage: function(message) {
        socket.emit("message", message);
      }
    };
});
