'use strict';

app.directive('scrollPosition', function($window) {
  return function(scope, element, attrs) {
    var windowEl = angular.element($window);
    windowEl.on('scroll', function() {
      scope.$apply(function() {
        scope[attrs.scrollPosition] = windowEl.scrollTop();
      });
    });
  };
});


app.directive('activeLink', ['$location', function(location) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs, controller) {
            var activeCssClass = attrs.activeLink;
            var path = attrs.href;
            path = path.substring(1); //hack because path does bot return including hashbang
            scope.location = location;
            scope.$watch('location.path()', function(newPath) {
                if (path === newPath) {
                    element.addClass(activeCssClass);
                } else {
                    element.removeClass(activeCssClass);
                }
            });
        }
    };
}]);