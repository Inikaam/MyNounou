(function() {
	'use strict';

	angular.module('myNounou')
		.controller('AuthenticateCtrl', AuthenticateCtrl)
		.controller('AuthenticateCreateNannyCtrl', AuthenticateCreateNannyCtrl);
	
	AuthenticateCtrl.$inject = ['$state', '$stateParams', '$cordovaToast'];
	
	function AuthenticateCtrl($state, $routeParams, $cordovaToast) {
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
				// TODO : connexion avec le serveur
			} else {
				$cordovaToast.show('Les champs doivent être remplis correctement.', 'short', 'bottom');
			}
		}
		
	}
	
	AuthenticateCreateNannyCtrl.$inject = ['$state', '$stateParams', '$cordovaToast', '$http', 'API_URL'];
	
	function AuthenticateCreateNannyCtrl($state, $routeParams, $cordovaToast, $http, API_URL) {
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
		createNanny.step = 1; // TODO : remettre à 1
		createNanny.typeDescription = {
			nanny: "Vous êtes assistante maternelle et vous vous occupez d'un ou plusieurs enfants.",
			babysitter: "Vous gardez des enfants pendant quelques heures pour permettre aux parents de sortir."
		};
		// Methods
		createNanny.changeStep = changeStep;
		
		function changeStep(form) {
			if(form.$valid && createNanny.step < 5) {
				createNanny.step++;
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
			$http({
				url: API_URL + '/nannies',
				method: 'POST',
				data: nanny,
				headers: {
					"Access-Control-Allow-Origin": "*"
				},
			})
			.success(function(res) {
				console.info(res);
				if(! res.success) {
					
				} else {
					
				}
			})
			.error(function(err) {
				throw err;
			});
		}
		
	}

})();