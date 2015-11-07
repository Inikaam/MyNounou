(function() {
	'use strict';

	angular.module('myNounou')
		.controller('SearchParentsCtrl', SearchParentsCtrl)

	SearchParentsCtrl.$inject = ['$state', '$stateParams', '$cordovaToast', '$http', '$ionicLoading', 'API_URL'];

	function SearchParentsCtrl($state, $routeParams, $cordovaToast, $http, $ionicLoading, API_URL) {
		var searchParents = this;
	}

})();

