// Ionic Starter App

(function() {

	angular.module('myNounou', [ 'ionic', 'google.places', 'ngCordova', 'ionic-timepicker' ])

	.run(function($ionicPlatform) {
		$ionicPlatform
			.ready(function() {
				// Hide the accessory bar by default (remove this to
				// show the accessory bar above the keyboard
				// for form inputs)
				if (window.cordova && window.cordova.plugins
						&& window.cordova.plugins.Keyboard) {
					cordova.plugins.Keyboard
							.hideKeyboardAccessoryBar(true);
					cordova.plugins.Keyboard.disableScroll(true);

				}
				if (window.StatusBar) {
					// org.apache.cordova.statusbar required
					StatusBar.styleLightContent();
				}
			});
		})
		.constant('API_URL', 'http://localhost:8080')
		.controller('MainCtrl', MainCtrl)
		.filter('time', timeFormat)
		.config(function($stateProvider, $urlRouterProvider, $httpProvider) {
			$httpProvider.defaults.useXDomain = true;
			delete $httpProvider.defaults.headers.common['X-Requested-With'];
			$httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
			$stateProvider
				// ***** Authentication *****
				.state('authenticate', {
					url : '/authenticate',
					abstract : true,
					templateUrl: ''
				})

				.state('authenticate.login', {
					url : '/login',
					cache: false,
					templateUrl : 'templates/authenticate/login.html',
					controller : 'LoginCtrl as auth'
				})

				.state('authenticate.create-nanny', {
					url : '/create-nanny',
					cache: false,
					templateUrl : 'templates/authenticate/create-nanny.html',
					controller : 'CreateNannyCtrl as createNanny'
				})

				.state('authenticate.create-parent', {
					url : '/create-parent',
					cache: false,
					templateUrl : 'templates/authenticate/create-parent.html',
					controller : 'CreateParentCtrl as createParent'
				})

				// ***** Nannies dashboard *****

				.state('nannies', {
					url : '/nannies',
					abstract : true,
					templateUrl : 'templates/nannies/tabs.html'
				})

				.state('nannies.search-parents', {
					url : '/search-parents',
					views : {
						'nannies-search-parents' : {
							templateUrl : 'templates/nannies/search.html',
							controller : 'SearchParentsCtrl as searchParents'
						}
					}
				})

				.state('nannies.calendar', {
					url : '/calendar',
					cache: false,
					views : {
						'nannies-calendar' : {
							templateUrl : 'templates/calendar/calendar.html',
							controller : 'CalendarCtrl as calendar'
						}
					}
				})
				
				.state('nannies.calendar-edit-day', {
					url : '/calendar/day/:day',
					cache: false,
					views : {
						'nannies-calendar' : {
							templateUrl : 'templates/calendar/calendar-edit-day.html',
							controller : 'CalendarEditDayCtrl as editDay'
						}
					}
				})
				
				.state('nannies.calendar-edit-restriction', {
					url : '/calendar/restriction/:id',
					cache: false,
					views : {
						'nannies-calendar' : {
							templateUrl : 'templates/calendar/calendar-edit-restriction.html',
							controller : 'CalendarEditRestrictionCtrl as editRestrict'
						}
					}
				})

				// ***** Parents dashboard *****

				.state('parents', {
					url : '/parents',
					abstract : true,
					templateUrl : 'templates/parents/tabs.html'
				})

				.state('parents.search-nannies', {
					url : '/search-nannies',
					views : {
						'tab-dash' : {
							templateUrl : 'templates/parents/search.html',
							controller : 'NanniesSearchCtrl as searchNannies'
						}
					}
				});

			// default route
			$urlRouterProvider.otherwise('/authenticate/login');

		});

	MainCtrl.$inject = ['$scope', '$state'];

	function MainCtrl($scope, $state) {
		var main = this;
		
		
		main.logout = logout;
		
		$scope.$on('$ionicView.beforeEnter', function(event, targetView) {

			// ***** Authentication restriction access *****
			if(/^authenticate\..*$/.test(targetView.stateId)) {
				if(sessionStorage.getItem('token') && sessionStorage.getItem('user_id')) {
					if(sessionStorage.getItem('user_type') == 'parent')
						$state.go('parents.search-nannies');
					else if(sessionStorage.getItem('user_type') == 'nanny')
						$state.go('nannies.search-parents');
					else {
						sessionStorage.removeItem('token');
						sessionStorage.removeItem('user_id');
						sessionStorage.removeItem('user_type');
					}
				}
			}

			// ***** Nannies Dashboard restriction access ******
			if(/^nannies\..*$/.test(targetView.stateId)) {
				if(! sessionStorage.getItem('token') ||
					sessionStorage.getItem('user_id') ||
					sessionStorage.getItem('user_type') ||
					sessionStorage.getItem('user_type') != 'nanny') {


				}
			}

		});
		
		function logout() {
			sessionStorage.removeItem('token');
			sessionStorage.removeItem('user_id');
			sessionStorage.removeItem('user_type');
			$state.go('authenticate.login');
		}
	}
	
	function timeFormat() {
		return function(input) {
			var hours = Math.floor(input / 3600);
			var min = Math.floor((input % 3600) / 60);
			if(hours < 10)
				hours = '0' + hours;
			if(min < 10)
				min = '0' + min;
			return hours + ' : ' + min;
		}
	}
})();
