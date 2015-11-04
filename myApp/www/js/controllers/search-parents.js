(function() {
	'use strict';

angular.module('myNounou')
		.controller( 'SkillsController', [ '$scope', 'SkillsService', function( $scope, SkillsService) {
		var skillsBase = SkillsService.query().skills[0];
		$scope.skills = skillsBase.items;
		
		.controller('SearchParents', SearchParents)
	
	SearchParents.$inject = ['$state', '$stateParams', '$cordovaToast'];
	
	function SearchParents($state, $routeParams, $cordovaToast) {
		$scope.searchParents = this.query();	
	}
}