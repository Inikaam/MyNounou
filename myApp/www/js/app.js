// Ionic Starter App

(function() {

	angular.module('myNounou', [ 'ionic', 'google.places' ])

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
		.constant('API', 'http://localhost:8080')
		.config(function($stateProvider, $urlRouterProvider) {
			$stateProvider
				.state('authenticate', {
					url : '/authenticate',
					templateUrl : 'templates/authenticate/authenticate.html',
					controller : 'AuthenticateCtrl as auth'
				})
	
				// setup an abstract state for the tabs directive
				.state('tab', {
					url : '/tab',
					abstract : true,
					templateUrl : 'templates/tabs.html'
				})
	
				// Each tab has its own nav history stack:
				.state('tab.dash', {
					url : '/dash',
					views : {
						'tab-dash' : {
							templateUrl : 'templates/tab-dash.html',
							controller : 'DashCtrl'
						}
					}
				})
				.state('tab.results', {
					url : '/results',
					params : {
						vicinity : {},
						lat : {},
						lng : {},
						need : {}
					},
					views : {
						'tab-dash' : {
							templateUrl : 'templates/results.html',
							controller : 'ResultsCtrl'
						}
					}
				})
				.state('tab.result', {
					url : '/results/:id',
					views : {
						'tab-dash' : {
							templateUrl : 'templates/result.html',
							controller : 'ResultCtrl'
						}
					}
				})
				.state('tab.chats', {
					url : '/chats',
					views : {
						'tab-chats' : {
							templateUrl : 'templates/tab-chats.html',
							controller : 'ChatsCtrl'
						}
					}
				})
				.state('tab.chat-detail', {
					url : '/chats/:chatId',
					views : {
						'tab-chats' : {
							templateUrl : 'templates/chat-detail.html',
							controller : 'ChatDetailCtrl'
						}
					}
				})
				.state('tab.account', {
					url : '/account',
					views : {
						'tab-account' : {
							templateUrl : 'templates/tab-account.html',
							controller : 'AccountCtrl'
						}
					}
				});
			
			// default route
			$urlRouterProvider.otherwise('/authenticate');

		});

})();