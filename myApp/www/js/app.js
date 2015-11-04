// Ionic Starter App

(function() {

	angular.module('myNounou', [ 'ionic', 'google.places', 'ngCordova' ])

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
		.config(function($stateProvider, $urlRouterProvider, $httpProvider) {
			$httpProvider.defaults.useXDomain = true;
			delete $httpProvider.defaults.headers.common['X-Requested-With'];
			$httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
			$stateProvider
				.state('authenticate', {
					url : '/authenticate',
					cache: false,
					templateUrl : 'templates/authenticate/authenticate.html',
					controller : 'AuthenticateCtrl as auth'
				})
				
				.state('create-nanny', {
					url : '/authenticate/create-nanny',
					cache: false,
					templateUrl : 'templates/authenticate/create-nanny.html',
					controller : 'AuthenticateCreateNannyCtrl as createNanny'
				})
				
				// Search parents
				.state('search-parents', {
					url : '/search-parents',
					cache: false,
					templateUrl : 'templates/search/search-parents.html',
					controller : 'SearchParents as searchParents'
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