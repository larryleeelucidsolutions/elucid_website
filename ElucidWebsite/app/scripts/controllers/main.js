'use strict';

function onGoogleReady() {
	console.log("Google maps api initialized.");
  	angular.bootstrap(document.getElementById("map"), ['websiteApp']);
}

app.controller('MainCtrl', ['$scope', function ($scope) {
    $scope.name = 'main';
}]);


app.controller('MapCtrl', ['$scope', '$window', function ($scope, $window) {

	var officeLocation = new google.maps.LatLng(38.985217, -77.086967);
    $scope.mapOptions = {
      center: officeLocation,
      zoom: 18,
	  scrollwheel: false,
	  tooltip: 'Elucid Solutions, Inc.',
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    // Markers should be added after map is loaded
    $scope.onMapIdle = function() {
        if ($scope.myMarkers === undefined){    
            var marker = new google.maps.Marker({
                map: $scope.myMap,
                position: officeLocation,
				icon: '/images/mapmarker.png'
            });
            $scope.myMarkers = [marker, ];			
        }
    };
	
	$scope.markerClicked = function(marker) {
        window.open("https://www.google.com/maps/dir//4300+Montgomery+Ave,+Bethesda,+MD+20814/@38.9857063,-77.0889078,17z/data=!3m1!4b1!4m8!4m7!1m0!1m5!1m1!1s0x89b7c96e5d489579:0xc7b5e8794fe532b7!2m2!1d-77.086762!2d38.9857021");
    };
	
}]);
