(function() {
	'use strict';

	angular.module('myNounou')
		.controller('SearchParentsCtrl', SearchParentsCtrl)
		.controller('CalendarCtrl', CalendarCtrl);
	
	SearchParentsCtrl.$inject = ['$state', '$stateParams', '$cordovaToast', '$http', '$ionicLoading', 'API_URL'];
	
	function SearchParentsCtrl($state, $routeParams, $cordovaToast, $http, $ionicLoading, API_URL) {
		var pSearch = this;
	}
	
	CalendarCtrl.$inject = ['$state', '$stateParams', '$cordovaToast', '$http', '$ionicLoading', 'API_URL'];
	
	function CalendarCtrl($state, $routeParams, $cordovaToast, $http, $ionicLoading, API_URL) {
		var calendar = this;
	}
	
})();