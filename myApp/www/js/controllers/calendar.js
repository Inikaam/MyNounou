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
	
	CalendarEditRestrictionCtrl.$inject = ['$state', '$filter', '$ionicHistory', '$stateParams', '$cordovaToast', '$http', '$ionicLoading', 'API_URL'];
	
	function CalendarEditRestrictionCtrl($state, $filter, $ionicHistory, $routeParams, $cordovaToast, $http, $ionicLoading, API_URL) {
		var editRestrict = this;
		
		// Variables
		editRestrict.restrictData = {
			timeStart: 0,
			timeEnd: 0,
			reason: ''
		}
		
		var weekDaysList = ["S", "D", "L", "Ma", "Me", "J", "V"];
		var monthList = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
		
		// Methods
		editRestrict.timePickerCallback = function(){};
		editRestrict.saveRestrict = saveRestrict;
		
		editRestrict.startDatePicker = {
		    titleLabel: 'Choisir une date',  // Optional
		    todayLabel: 'Aujourd\'hui',  // Optional
		    closeLabel: 'Fermer',  // Optional
		    setLabel: 'Valider',  // Optional
		    setButtonType : 'button-positive',  // Optional
		    todayButtonType : 'button-stable hide',  // Optional
		    closeButtonType : 'button-calm',  // Optional
		    inputDate: new Date(),  // Optional
		    mondayFirst: true,  // Optional
		    templateType: 'popup', // Optional
		    showTodayButton: false, // Optional
		    weekDaysList: weekDaysList,
		    monthList: monthList,
		    callback: function (val) {  // Mandatory
		    	if(val)
		    		editRestrict.startDatePicker.inputDate = val;
		    },
		    dateFormat: 'dd/MM/yyyy', // Optional
		    closeOnSelect: false, // Optional
		};
		
		editRestrict.endDatePicker = {
				titleLabel: 'Choisir une date',  // Optional
				todayLabel: 'Aujourd\'hui',  // Optional
				closeLabel: 'Fermer',  // Optional
				setLabel: 'Valider',  // Optional
				setButtonType : 'button-positive',  // Optional
			    todayButtonType : 'button-stable hide',  // Optional
			    closeButtonType : 'button-calm',  // Optional
				inputDate: new Date(),  // Optional
				mondayFirst: true,  // Optional
				templateType: 'popup', // Optional
				showTodayButton: false, // Optional
				weekDaysList: weekDaysList,
				monthList: monthList,
				callback: function (val) {  // Mandatory
					if(val)
						editRestrict.endDatePicker.inputDate = val;
				},
				dateFormat: 'dd/MM/yyyy', // Optional
				closeOnSelect: false, // Optional
		};
		
		if($routeParams.id && $routeParams.id != 'new') {
			
			$ionicLoading.show({template: 'Chargement...'});
			$http({
				method: 'GET',
				url: API_URL + '/api/nannies/' + sessionStorage.getItem('user_id') + '/restrictions/' + $routeParams.id + '?token=' + sessionStorage.getItem('token'),
			})
			.success(function(res) {
				$ionicLoading.hide();
				if(! res.success)
					$cordovaToast.show(res.message, 'short', 'bottom');
				else {
					var data = convertDateToData(res.data);
					editRestrict.startDatePicker.inputDate = data.dateStart;
					editRestrict.endDatePicker.inputDate = data.dateEnd;
					editRestrict.restrictData.timeStart = data.timeStart;
					editRestrict.restrictData.timeEnd = data.timeEnd;
					editRestrict.restrictData.reason = res.data.reason;
				}
			})
			.error(function(err) {
				$ionicLoading.hide();
				console.error(err);
			});
		}
		
		function saveRestrict() {
			var start = convertToDate(editRestrict.startDatePicker.inputDate, editRestrict.restrictData.timeStart);
			var end = convertToDate(editRestrict.endDatePicker.inputDate, editRestrict.restrictData.timeEnd);
			
			if(start >= end) {
				$cordovaToast.show('La date de début ne peut pas être supérieure à la date de fin', 'short', 'bottom');
			} else if(editRestrict.restrictData.reason == '') {
				$cordovaToast.show('La raison de l\'indisponibilité doit être indiquée.', 'short', 'bottom');
			} else {
				if($routeParams.id == 'new') {
					$ionicLoading.show({template: 'Chargement...'});
					$http({
						method: 'POST',
						url: API_URL + '/api/nannies/' + sessionStorage.getItem('user_id') + '/restrictions?token=' + sessionStorage.getItem('token'),
						data: $.param({
							start: start,
							end: end,
							reason: editRestrict.restrictData.reason
						})
					})
					.success(function(res) {
						$ionicLoading.hide();
						if(! res.success)
							$cordovaToast.show(res.message, 'short', 'bottom');
						else {
							$cordovaToast.show(res.message, 'short', 'bottom');
							$ionicHistory.goBack();
						}
					})
					.error(function(err) {
						$ionicLoading.hide();
						console.error(err);
					});
				} else {
					$ionicLoading.show({template: 'Chargement...'});
					$http({
						method: 'PUT',
						url: API_URL + '/api/nannies/' + sessionStorage.getItem('user_id') + '/restrictions/' + $routeParams.id + '?token=' + sessionStorage.getItem('token'),
						data: {
							start: start,
							end: end,
							reason: editRestrict.restrictData.reason
						}
					})
					.success(function(res) {
						$ionicLoading.hide();
						console.info(res);
						if(! res.success)
							$cordovaToast.show(res.message, 'short', 'bottom');
						else {
							$ionicHistory.goBack();
							$cordovaToast.show(res.message, 'short', 'bottom');
						}
					})
					.error(function(err) {
						$ionicLoading.hide();
						console.error(err);
					});
				}
			}
		}
		
		function convertToDate(date, time) {
			var year = $filter('date')(date, 'yyyy');
			var month = parseInt($filter('date')(date, 'MM'), 10) - 1;
			var day = $filter('date')(date, 'dd');
			var hour = Math.floor(time / 3600);
			var min = Math.floor((time % 3600) / 60);
			
			return new Date(year, month, day, hour, min);
		}
		
		function convertDateToData(date) {
			var data = {};
			
			data.dateStart = date.start;
			data.dateEnd = date.end;
			
			data.timeStart = extractTime(date.start);
			data.timeEnd = extractTime(date.end);
			
			console.info(data);
			return data;
		}
		
		function extractTime(date) {
			var hour = parseInt($filter('date')(date, 'HH'));
			var min = parseInt($filter('date')(date, 'mm'));
			
			return ((hour * 3600) + (min * 60));
		}
		
	}

})();
