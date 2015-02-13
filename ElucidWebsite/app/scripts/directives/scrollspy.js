'use strict';

app.directive('scrollspy', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var targetElement;
            var rectangle;
            var elementHeight;
            var elementTop;
            var offset = 210;
            scope.$watch('scroll', function (newValue, oldValue) {
                targetElement = angular.element("#" + attrs.spy);
                rectangle = targetElement[0].getBoundingClientRect();
                elementHeight = (rectangle.bottom - rectangle.top) - offset;

                elementTop = rectangle.top;
                if (rectangle.top <= offset && rectangle.top >= ((-1) * elementHeight))
                    element.addClass("active");
                else
                    element.removeClass("active")
            });
        }
    };
});


app.directive('spy', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var targetElement;
            var offset = 190;
            element.on('click', function () {
                targetElement = angular.element("#" + attrs.spy);
                angular.element("body").animate({
                    scrollTop: targetElement.offset().top - offset
                }, "slow");
            });
        }
    }
});