Chat.App.controller('ChatController', function($scope, Chat) {
    $scope.lines = Chat.getAll();
    $scope.users = Chat.getUsers();

    $scope.sendMessage = function(message) {
      Chat.sendMessage(message);
    }

    $scope.$on("newMessage", function() {
      $scope.lines = Chat.getAll();
    });

    $scope.$on("newUser", function() {
      $scope.users = Chat.getUsers();
    });
});
