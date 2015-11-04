(function() {
	'use strict';

	angular.module('myNounou')
		.controller('SearchParentsCtrl', SearchParentsCtrl)
		.controller('ParentCardCtrl', ParentCardCtrl);
	
	SearchParentsCtrl.$inject = ['$state', '$stateParams', '$cordovaToast', '$http', '$ionicLoading', 'API_URL'];
	
	function SearchParentsCtrl($state, $routeParams, $cordovaToast, $http, $ionicLoading, API_URL) {
		var pSearch = this;
	}
	
	ParentCardCtrl.$inject = ['$state', '$stateParams', '$cordovaToast', '$http', '$ionicLoading', 'API_URL'];
	
	function ParentCardCtrl($state, $routeParams, $cordovaToast, $http, $ionicLoading, API_URL) {
		var pCard = this;
	}
	
})();