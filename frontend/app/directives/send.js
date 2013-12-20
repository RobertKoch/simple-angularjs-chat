Chat.App.directive('send', function () {
  return {
    restrict: 'A',
    link: function ($scope, $element, attrs) {
        $element.on('keyup', function(event) {
            if(event.which === 13) {
                $scope.sendMessage( $element.val() );
                $element.val('');
            }
        });
    }
  };
});
