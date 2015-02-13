'use strict';

/**
 * Create an angular module for the entire website, along with registering
 * its dependencies.
 */
var app = angular.module('websiteApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute',
    'ngAnimate',
    'ui.bootstrap',
    'ui.map',
    'ui.event',
    'ui.mask'
]);

var viewCtrl = app.controller('ViewCtrl', function ($scope, $rootScope, $location) {
	$rootScope.serviceSlides = new Array("/services/research", "/services/management", "/services/development", "/services/training");
	$rootScope.contractSlides = new Array("/contracts/ciosp3", "/contracts/schedule70", "/contracts/8astars2");
    $rootScope.go = function (path) {
        $location.path(path);
    }
});


viewCtrl.resolve = {
  delay: ["$q", "$timeout", function($q, $timeout) {
    var delay = $q.defer();
    $timeout(delay.resolve, 0, false);
    return delay.promise;
  }]
};


/**
 * This is route configuration of the website.
 */
app.config(['$routeProvider', '$httpProvider',
    function ($routeProvider, $httpProvider) {

        // Enable cross domain calls
        $httpProvider.defaults.useXDomain = true;

        // Remove the header used to identify ajax call  that would prevent CORS from working
        delete $httpProvider.defaults.headers.common['X-Requested-With'];

        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html',
                controller: 'MainCtrl'
            })
            .when('/services', {
                templateUrl: 'views/services.html',
                controller: 'ServicesCtrl'
            })
            .when('/aboutus', {
                templateUrl: 'views/aboutus.html',
                controller: 'AboutusCtrl'
            })
            .when('/contactus', {
                templateUrl: 'views/contactus.html',
                controller: 'ContactusCtrl'
            })
            .when('/services/research', {
                templateUrl: 'views/research.html',
                controller: 'ResearchCtrl',
				resolve: viewCtrl.resolve
            })
            .when('/services/development', {
                templateUrl: 'views/development.html',
                controller: 'DevelopmentCtrl',
				resolve: viewCtrl.resolve
            })
            .when('/services/management', {
                templateUrl: 'views/management.html',
                controller: 'ManagementCtrl',
				resolve: viewCtrl.resolve
            })
            .when('/services/training', {
                templateUrl: 'views/training.html',
                controller: 'TrainingCtrl',
				resolve: viewCtrl.resolve
            })
            .when('/contracts/ciosp3', {
                templateUrl: 'views/ciosp3.html',
                controller: 'Ciosp3Ctrl',
				resolve: viewCtrl.resolve
            })
            .when('/contracts/8astars2', {
                templateUrl: 'views/8astars2.html',
                controller: '8astars2Ctrl',
				resolve: viewCtrl.resolve
            })
            .when('/contracts/schedule70', {
                templateUrl: 'views/schedule70.html',
                controller: 'Schedule70Ctrl',
				resolve: viewCtrl.resolve
            })
            .otherwise({
                redirectTo: '/'
            });			

    }
]);




/* * * * *   L I S T E N   F O R   R O U T E   C H A N G E    * * * * */
/* * * * *  A N D   S E T   T R A N S I T I O N   C L A S S   * * * * */
/**
 * Listen for route change and set the transition class (see index.html page)
 */
app.run(function ($rootScope, $window) {
		
    $rootScope.$on("$routeChangeSuccess", function (event, next, current) {
        $(window).scrollTop(0);
    });
	
    $rootScope.$on("$locationChangeSuccess", function (event, next, current) {
        //$rootScope.transitionClass = "";
    });
	
    $rootScope.$on("$locationChangeStart", function (event, next, current) {
		var currentPosition;
		var nextPosition;
		
        // url slug : shortening the url to stuff that follows after "#"
        current = current.slice(current.lastIndexOf('#') + 1, current.length);
        next = next.slice(next.lastIndexOf('#') + 1, next.length);
		
		// previous pages was not one of the slides, don't transition
		if (($rootScope.serviceSlides.indexOf(current) < 0) && ($rootScope.contractSlides.indexOf(current) < 0)) {
			$rootScope.transitionClass = "";
			return;
		}
		
		if ($rootScope.serviceSlides.indexOf(next) >= 0) {
			currentPosition = $rootScope.serviceSlides.indexOf(current);
			nextPosition = $rootScope.serviceSlides.indexOf(next);
			
			if (currentPosition < nextPosition) {
				$rootScope.transitionClass = "slide left";
			}
			else {
				$rootScope.transitionClass = "slide right";
			}			
		} else if ($rootScope.contractSlides.indexOf(next) >= 0) {
			
			currentPosition = $rootScope.contractSlides.indexOf(current);
			nextPosition = $rootScope.contractSlides.indexOf(next);
			
			if (currentPosition < nextPosition) {
				$rootScope.transitionClass = "slide left";
			}
			else {
				$rootScope.transitionClass = "slide right";
			}			
		} else {
			// not one of the slides, no transition
			$rootScope.transitionClass = "";
			return;
		}

		// disable transition if in a slide		
		if (currentPosition < 0 || nextPosition < 0)
			$rootScope.transitionClass = "";
			
    })
});


