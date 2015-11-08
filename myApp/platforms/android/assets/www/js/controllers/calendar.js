(function() {
	'use strict';

	angular.module('myNounou')
		.controller('CalendarCtrl', CalendarCtrl)
		.controller('CalendarEditDayCtrl', CalendarEditDayCtrl)
		.controller('CalendarEditRestrictionCtrl', CalendarEditRestrictionCtrl);

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
	
	CalendarEditDayCtrl.$inject = ['$state', '$ionicHistory', '$stateParams', '$cordovaToast', '$http', '$ionicLoading', 'API_URL'];
	
	function CalendarEditDayCtrl($state, $ionicHistory, $routeParams, $cordovaToast, $http, $ionicLoading, API_URL) {
		var editDay = this;
		
		// Variables
		var dayNames = {
			lun: 'lundi',
			mar: 'mardi',
			mer: 'mercredi',
			jeu: 'jeudi',
			ven: 'vendredi',
			sam: 'samedi',
			dim: 'dimanche'
		}
		editDay.day = dayNames[$routeParams.day];
		
		// Private vars
		var nanny = {}
		
		// Methods
		editDay.timePickerCallback = function(){};
		editDay.addRange = addRange;
		editDay.removeRange = removeRange;
		editDay.validRanges = validRanges;
		
		
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
				nanny = res.data;
				if(res.data.dispos[$routeParams.day]) {
					editDay.ranges = res.data.dispos[$routeParams.day];
					if(editDay.ranges.length == 0)
						editDay.ranges.push({start: 0, end: 0});
				} else {
					$state.go('nannies.calendar');
				}
			}
		})
		.error(function(err) {
			$ionicLoading.hide();
			console.error(err);
		});
		
		function addRange() {
			editDay.ranges.push({start: 0, end: 0});
			
		}
		
		function removeRange(index) {
			editDay.ranges.splice(index, 1);
		}
		
		function validRanges() {
			var currentRange = {};
			
			for(var i in editDay.ranges) {
				currentRange = editDay.ranges[i];
				
				if(currentRange.start >= currentRange.end) {
					$cordovaToast.show('Les heures de début ne peuvent être supérieures aux heures de fin.', 'short', 'bottom');
					return;
				}
			}
			
			nanny.dispos[$routeParams.day] = editDay.ranges;
			
			$http({
				method: 'PUT',
				url: API_URL + '/api/nannies/' + sessionStorage.getItem('user_id') + '?token=' + sessionStorage.getItem('token'),
				data: {
					dispos: nanny.dispos
				}
			})
			.success(function(res) {
				if(! res.success)
					$cordovaToast.show(res.message, 'short', 'bottom');
				else {
					$ionicHistory.goBack();
				}
			})
			.error(function(err) {
				console.info(err);
			});
		}
	}
	
	CalendarEditRestrictionCtrl.$inject = ['$state', '$ionicHistory', '$stateParams', '$cordovaToast', '$http', '$ionicLoading', 'API_URL'];
	
	function CalendarEditRestrictionCtrl($state, $ionicHistory, $routeParams, $cordovaToast, $http, $ionicLoading, API_URL) {
		var editRestrict = this;
		
		
	}

})();
