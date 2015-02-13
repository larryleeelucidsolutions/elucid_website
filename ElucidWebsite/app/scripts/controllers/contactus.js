'use strict';

app.controller('ContactusCtrl', ['$scope', '$http', function ($scope, $http) {
	$scope.name = 'contactus';
	$scope.alerts = [];
	$scope.master = {
		name: '',
		title: '',
		email: '',
		phone: '',
		organization: '',
		message: ''
	};

	$scope.reset = function () {
		$scope.contact = angular.copy($scope.master);
	};

	$scope.isUnchanged = function (contact) {
		return angular.equals(contact, $scope.master);
	};

	$scope.reset();
		
	$scope.closeAlert = function() {
		$scope.alerts.splice(0, 1);
	};	
	
	$scope.submitContact = function (contact) {
		$scope.master = angular.copy(contact);
		
		// create a contact payload
		var payload = angular.copy(contact);
		delete payload.$error;
		delete payload.$name;
		delete payload.$dirty;
		delete payload.$pristine;
		delete payload.$pristine;
		delete payload.$invalid;
		delete payload.$valid;
				
		$http.post('http://52.0.139.82:3001/contact', JSON.stringify(payload), {headers : { 'Content-Type': 'application/json' }})
		.success(function(data, status, headers, config) {
			/*
			** A response status code between 200 and 299 is considered a success status and will result in the success callback 
			*/
			$scope.alerts = [];
			$scope.alerts.push({ type: 'success', msg: 'Thank you for your message.  We will get back with you shortly.' });
			$scope.contact = {
				name: '',
				title: '',
				email: '',
				phone: '',
				organization: '',
				message: ''
			};
			$scope.contactForm.$setPristine();
			
		}).error(function(data, status, headers, config) {
			if (status === 409) {			
				$scope.alerts = [];			
				$scope.alerts.push({ type: 'danger', msg: 'You have exceeded the number of submissions allowed (2).' });
			}				
		});;
	};
	
	
	
}]);



