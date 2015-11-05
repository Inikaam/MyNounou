(function() {
	'use strict';

	angular.module('myNounou')
		.controller('CalendarCtrl', CalendarCtrl)
		.controller('CalendarEditDayCtrl', CalendarEditDayCtrl);

	CalendarCtrl.$inject = ['$state', '$stateParams', '$cordovaToast', '$http', '$ionicLoading', 'API_URL'];

	function CalendarCtrl($state, $routeParams, $cordovaToast, $http, $ionicLoading, API_URL) {
		var calendar = this;

		// Variables
		calendar.dispos = [];
		
		// Methods
		$ionicLoading.show({template: 'Chargement...'});
		$http({
			method: 'GET',
			url: API_URL + '/api/nannies/' + sessionStorage.getItem('user_id') + '?token=' + sessionStorage.getItem('token'),
		})
		.success(function(res) {
			$ionicLoading.hide();
			if(! res.success)
				$cordovaToast.show(res.message, 'short', 'bottom');
			else {
				calendar.dispos = res.data.dispos;
				calendar.restrictions = res.data.restrictions;
			}
		})
		.error(function(err) {
			$ionicLoading.hide();
			console.error(err);
		});
	}
	
	CalendarEditDayCtrl.$inject = ['$state', '$stateParams', '$cordovaToast', '$http', '$ionicLoading', 'API_URL'];
	
	function CalendarEditDayCtrl($state, $routeParams, $cordovaToast, $http, $ionicLoading, API_URL) {
		var editDay = this;
		
		// Variables
		editDay.slots = { epochTime: 12600, format: 24, step: 15 };
		
		// Methods
		editDay.timePickerCallback = function(){};
		
		$ionicLoading.show({template: 'Chargement...'});
		$http({
			method: 'GET',
			url: API_URL + '/api/nannies/' + sessionStorage.getItem('user_id') + '?token=' + sessionStorage.getItem('token'),
		})
		.success(function(res) {
			$ionicLoading.hide();
			if(! res.success)
				$cordovaToast.show(res.message, 'short', 'bottom');
			else {
				if(res.data.dispos[$routeParams.day]) {
					editDay.dispo = res.data.dispos[$routeParams.day];
					if(editDay.dispo.length == 0)
						editDay.dispo.push({start: 0, end: 0});
				} else {
					$state.go('nannies.calendar');
				}
			}
		})
		.error(function(err) {
			$ionicLoading.hide();
			console.error(err);
		});
	}

})();
