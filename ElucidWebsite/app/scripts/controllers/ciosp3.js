'use strict';

app.controller('Ciosp3Ctrl', ['$scope', '$http', function ($scope, $http) {
	$scope.name = 'ciosp3';
	$scope.workLocation = "Elucid";
	
	$scope.totalItems = 0;
  	$scope.currentPage = 1;
	$scope.maxSize = '10';
		
	$scope.setPage = function (pageNo) {
    	$scope.currentPage = pageNo;
		$scope.getLaborRates();
  	};

	$scope.setWorkLocation = function(workLocation) {
		$scope.workLocation = workLocation;
		$scope.getLaborRates();
	}
	
	$scope.getLaborRates = function () {
		var payload = {
			searchTerm: (typeof($scope.searchTerm) == 'undefined') ? "" : $scope.searchTerm,
			contractType: 'CIOSP3',
			workLocation: $scope.workLocation,
			pageIndex: $scope.currentPage - 1,
			pageSize: $scope.maxSize,
			pageSort: 'ascending'		
		};		
		
		$http({
			method  : 'GET',
			// url     : 'http://www.elucidsolutions.com/website-ws/rates/search',
			url     : 'http://52.0.139.82:3001/rates/search',
			params  : payload,
			headers : { 'Content-Type': 'application/json' }  // set the headers so angular passing info as form data (not request payload)
		}).success(function(data, status, headers, config) {
			$scope.rates = data;
			$scope.getPageCount();			
		});
	};
	
	
	$scope.getPageCount = function () {
		var payload = {
			searchTerm: (typeof($scope.searchTerm) == 'undefined') ? "" : $scope.searchTerm,
			contractType: 'CIOSP3',
			workLocation: $scope.workLocation,
			pageIndex: $scope.currentPage - 1,
			pageSize: $scope.maxSize,
			pageSort: 'ascending'		
		};		
		
		$http({
			method  : 'GET',
			// url     : 'http://www.elucidsolutions.com/website-ws/rates/count',
			url     : 'http://52.0.139.82:3001/rates/count',
			params  : payload,
			headers : { 'Content-Type': 'application/json' }  // set the headers so angular passing info as form data (not request payload)
		}).success(function(data, status, headers, config) {
			$scope.totalItems = data;			
		});
	}
	
	$scope.$watch('maxSize', function() {
	 	$scope.getLaborRates();
	});
	
}]);


