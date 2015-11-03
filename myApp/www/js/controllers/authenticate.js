(function() {
	'use strict';

	angular.module('myNounou')
		.controller('AuthenticateCtrl', AuthenticateCtrl)
		.controller('AuthenticateCreateNannyCtrl', AuthenticateCreateNannyCtrl)
		.controller('AuthenticateCreateParentCtrl', AuthenticateCreateParentCtrl);
	
	AuthenticateCtrl.$inject = ['$state', '$stateParams', '$cordovaToast', '$http', 'API_URL'];
	
	function AuthenticateCtrl($state, $routeParams, $cordovaToast, $http, API_URL) {
		var auth = this;
		
		// Variables
		auth.loginData = {
			email: '',
			password: ''
		}
		// Methods
		auth.login = login;
		
		function login() {
			if(auth.loginForm.$valid) {
				var loginData = angular.copy(auth.loginData);
				loginData.password = md5(loginData.password);
				$ionicLoading.show({template: 'Chargement...'});
				$http({
					method: 'POST',
					url: API_URL + '/api/authenticate',
					data: $.param(loginData)
				})
				.success(function(res){
					$ionicLoading.hide();
					if(! res.success) {
						$cordovaToast.show(res.message, 'short', 'bottom');
					} else {
						sessionStorage.setItem('user_id', res.data._id);
						sessionStorage.setItem('token', res.token);
						if(res.data.dispos) {
							// TODO : rediriger vers la page nounous
						} else {
							// TODO : rediriger vers la page parents
						}
					}
				})
				.error(function(err){
					$ionicLoading.hide();
					console.error(err);
					$cordovaToast.show('Une erreur est survenue.', 'short', 'bottom');
				});
			} else {
				$cordovaToast.show('Les champs doivent être remplis correctement.', 'short', 'bottom');
			}
		}
		
	}
	
	AuthenticateCreateNannyCtrl.$inject = ['$state', '$stateParams', '$cordovaToast', '$http', '$ionicLoading', 'API_URL'];
	
	function AuthenticateCreateNannyCtrl($state, $routeParams, $cordovaToast, $http, $ionicLoading, API_URL) {
		var createNanny = this;
		
		// Variables
		createNanny.accountData = {
			email: '',
			firstname: '',
			lastname: '',
			password: '',
			confirmPassword: '',
			age: null,
			gender: 'F',
			type: 'nanny',
			address: '',
			address2: '',
			postcode: '',
			city: '',
			tel: '',
			description: '',
			price: null,
			dispos: {
				lun: [],
		    	mar: [],
		    	mer: [],
		    	jeu: [],
		    	ven: [],
		    	sam: [],
		    	dim: [],
			}
		};
		createNanny.step = 1;
		createNanny.typeDescription = {
			nanny: "Vous êtes assistante maternelle et vous vous occupez d'un ou plusieurs enfants.",
			babysitter: "Vous gardez des enfants pendant quelques heures pour permettre aux parents de sortir."
		};
		
		// Methods
		createNanny.changeStep = changeStep;
		
		function changeStep(form) {
			if(form.$valid && createNanny.step < 4) {
				createNanny.step++;
			} else if(form.$valid && createNanny.step < 5) {
				$ionicLoading.show({template: 'Chargement...'});
				var geocoder = new google.maps.Geocoder();
				
				geocoder.geocode({
					address: 
						createNanny.accountData.address + ' ' + 
						createNanny.accountData.address2 + ', ' + 
						createNanny.accountData.postcode + ', ' + 
						createNanny.accountData.city +', France'
				}, function(results, status) {
					if(results.length > 0) {
						createNanny.accountData.lat = results[0].geometry.location.lat();
						createNanny.accountData.lng = results[0].geometry.location.lng();
						createNanny.step++;
					} else {
						$cordovaToast.show("Adresse introuvable.", 'short', 'bottom');
					}
					$ionicLoading.hide();
				});
			} else if(form.$valid && createNanny.step == 5) {
				if(createNanny.password != createNanny.confirmPassword) {
					$cordovaToast.show("Les mots de passe ne sont pas identiques.", 'short', 'bottom');
				} else {
					create();
				}
			} else {
				$cordovaToast.show('Les champs doivent être remplis correctement.', 'short', 'bottom');
			}
		}
		
		function create() {
			var nanny = angular.copy(createNanny.accountData);
			delete nanny.confirmPassword;
			nanny.password = md5(nanny.password);
			console.info(nanny);
			$ionicLoading.show({template: 'Chargement...'});
			$http({
				url: API_URL + '/api/nannies',
				method: 'POST',
				data: $.param(nanny)
			})
			.success(function(res) {
				$ionicLoading.hide();
				if(! res.success) {
					$cordovaToast.show(res.message, 'short', 'bottom');
				} else {
					sessionStorage.setItem('user_id', res.data._id);
					sessionStorage.setItem('token', res.token);
					$cordovaToast.show(res.message, 'short', 'bottom');
					// TODO : rediriger vers la page d'accueil du compte nounou
				}
				
			})
			.error(function(err) {
				$ionicLoading.hide();
				console.error(err);
				$cordovaToast.show('Erreur de connexion', 'short', 'bottom');
			});
		}
		
	}
	
	AuthenticateCreateParentCtrl.$inject = ['$state', '$stateParams', '$cordovaToast', '$http', '$ionicLoading', 'API_URL'];
	
	function AuthenticateCreateParentCtrl($state, $routeParams, $cordovaToast, $http, $ionicLoading, API_URL) {
		var createParent = this;
		
		// Variables
		createParent.accountData = {
			email: '',
			firstname: '',
			lastname: '',
			password: '',
			confirmPassword: '',
			age: null,
			gender: 'F',
			address: '',
			address2: '',
			postcode: '',
			city: '',
			tel: '',
			description: '',
		};
		createParent.step = 1;
		createParent.typeDescription = {
			nanny: "Vous êtes assistante maternelle et vous vous occupez d'un ou plusieurs enfants.",
			babysitter: "Vous gardez des enfants pendant quelques heures pour permettre aux parents de sortir."
		};
		
		// Methods
		createParent.changeStep = changeStep;
		
		function changeStep(form) {
			if(form.$valid && createParent.step < 4) {
				createParent.step++;
			} else if(form.$valid && createParent.step < 5) {
				$ionicLoading.show({template: 'Chargement...'});
				var geocoder = new google.maps.Geocoder();
				
				geocoder.geocode({
					address: 
						createParent.accountData.address + ' ' + 
						createParent.accountData.address2 + ', ' + 
						createParent.accountData.postcode + ', ' + 
						createParent.accountData.city +', France'
				}, function(results, status) {
					if(results.length > 0) {
						createParent.accountData.lat = results[0].geometry.location.lat();
						createParent.accountData.lng = results[0].geometry.location.lng();
						createParent.step++;
					} else {
						$cordovaToast.show("Adresse introuvable.", 'short', 'bottom');
					}
					$ionicLoading.hide();
				});
			} else if(form.$valid && createParent.step == 5) {
				if(createParent.password != createParent.confirmPassword) {
					$cordovaToast.show("Les mots de passe ne sont pas identiques.", 'short', 'bottom');
				} else {
					create();
				}
			} else {
				$cordovaToast.show('Les champs doivent être remplis correctement.', 'short', 'bottom');
			}
		}
		
		function create() {
			var parent = angular.copy(createParent.accountData);
			delete parent.confirmPassword;
			parent.password = md5(parent.password);
			$ionicLoading.show({template: 'Chargement...'});
			$http({
				url: API_URL + '/api/parents',
				method: 'POST',
				data: $.param(parent)
			})
			.success(function(res) {
				$ionicLoading.hide();
				if(! res.success) {
					$cordovaToast.show(res.message, 'short', 'bottom');
				} else {
					sessionStorage.setItem('user_id', res.data._id);
					sessionStorage.setItem('token', res.token);
					$cordovaToast.show(res.message, 'short', 'bottom');
					// TODO : rediriger vers la page d'accueil du compte nounou
				}
			})
			.error(function(err) {
				$ionicLoading.hide();
				console.error(err);
				$cordovaToast.show('Erreur de connexion', 'short', 'bottom');
			});
		}
		
	}

})();