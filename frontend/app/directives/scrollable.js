Chat.App.directive('scrollable', function () {
  return {
    restrict: 'A',
    link: function ($scope, $element, attrs) {
        $scope.$watch('lines', function() {
            var sHeight = $element[0].scrollHeight;
            var height = $element.height();
            $element.scrollTop(sHeight - height);
        }, true);
    }
  };
});
