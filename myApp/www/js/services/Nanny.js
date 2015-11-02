(function() {
	angular.module('myNounou')
		.factory('Nanny', NannyFactory);
	
	NannyFactory.$inject = ['API']
	
	function NannyFactory(API) {
		function Nanny() {
			this._id = 'defefefe';
		}
		
		return Nanny;
	}
})();