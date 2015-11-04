(function() {
	'use strict';

	angular.module('myNounou')
		.controller('NanniesSearchCtrl', NanniesSearchCtrl);

	
	NanniesSearchCtrl.$inject = ['$state', '$stateParams', '$cordovaToast', '$http', '$ionicLoading', 'API_URL'];
	
	function NanniesSearchCtrl($state, $routeParams, $cordovaToast, $http, $ionicLoading, API_URL) {
		var pSearch = this;
	}
	
})();