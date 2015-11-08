<<<<<<< HEAD
(function() {
	'use strict';

	angular.module('myNounou')
		.controller('NanniesSearchCtrl', NanniesSearchCtrl);


	
	NanniesSearchCtrl.$inject = ['$state', '$stateParams', '$cordovaToast', '$http', '$ionicLoading', 'API_URL'];
	
	function NanniesSearchCtrl($state, $routeParams, $cordovaToast, $http, $ionicLoading, API_URL) {
		var searchNannies = this;

		searchNannies.slots = { epochTime: 12600, format: 24, step: 15 };
		searchNannies.slots2 = { epochTime: 12600, format: 24, step: 15 };

		searchNannies.timePickerCallback = function (val) {
		  if (typeof (val) === 'undefined') {
		    console.log('Time not selected');
		  } else {
		    console.log('Selected time is : ', val);    // `val` will contain the selected time in epoch
		  }
		}
	};
	
=======
(function() {
	'use strict';

	angular.module('myNounou')
		.controller('NanniesSearchCtrl', NanniesSearchCtrl)
		.controller('ParentsProfileCtrl', ParentsProfileCtrl);

	
	NanniesSearchCtrl.$inject = ['$state', '$stateParams', '$cordovaToast', '$http', '$ionicLoading', 'API_URL'];
	
	function NanniesSearchCtrl($state, $routeParams, $cordovaToast, $http, $ionicLoading, API_URL) {
		var searchNannies = this;

		searchNannies.slots = { epochTime: 12600, format: 24, step: 15 };
		searchNannies.slots2 = { epochTime: 12600, format: 24, step: 15 };

		searchNannies.timePickerCallback = function (val) {
		  if (typeof (val) === 'undefined') {
		    console.log('Time not selected');
		  } else {
		    console.log('Selected time is : ', val);    // `val` will contain the selected time in epoch
		  }
		}
	};

	ParentsProfileCtrl.$inject = ['$state', '$stateParams', '$cordovaToast', '$http', '$ionicLoading', 'API_URL'];

	function ParentsProfileCtrl($state, $routeParams, $cordovaToast, $http, $ionicLoading, API_URL) {
		var profileParents = this;
	}
	
>>>>>>> origin/slim
})();