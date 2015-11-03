(function() {
	'use strict';

	angular.module('myNounou')
		.controller('ParentsSearchCtrl', ParentsSearchCtrl)
		.controller('ParentCardCtrl', ParentCardCtrl);
	
	ParentsSearchCtrl.$inject = ['$state', '$stateParams', '$cordovaToast', '$http', '$ionicLoading', 'API_URL'];
	
	function ParentsSearchCtrl($state, $routeParams, $cordovaToast, $http, $ionicLoading, API_URL) {
		var pSearch = this;
	}
	
	ParentCardCtrl.$inject = ['$state', '$stateParams', '$cordovaToast', '$http', '$ionicLoading', 'API_URL'];
	
	function ParentCardCtrl($state, $routeParams, $cordovaToast, $http, $ionicLoading, API_URL) {
		var pCard = this;
	}
	
})();