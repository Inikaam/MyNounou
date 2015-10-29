angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope,$state,$stateParams) {

  $scope.need = "nounou";
  //$scope.address = {"address_components":[{"long_name":"Dijon","short_name":"Dijon","types":["locality","political"]},{"long_name":"Côte-d'Or","short_name":"Côte-d'Or","types":["administrative_area_level_2","political"]},{"long_name":"Bourgogne","short_name":"Bourgogne","types":["administrative_area_level_1","political"]},{"long_name":"France","short_name":"FR","types":["country","political"]}],"adr_address":"<span class=\"locality\">Dijon</span>, <span class=\"country-name\">France</span>","formatted_address":"Dijon, France","geometry":{"location":{},"viewport":{"O":{"O":47.286299,"j":47.377463},"j":{"j":4.9624430000000075,"O":5.101998999999978}}},"icon":"https://maps.gstatic.com/mapfiles/place_api/icons/geocode-71.png","id":"9f4511058b5d662c3642ec9edfe8d45796686036","name":"Dijon","place_id":"ChIJdZb974yd8kcR0FgUszTOCQQ","reference":"CnRqAAAAZiJCcugL4MCTNJh5bqMvbCvJ9egNUVVB6IxaAJN4WHxld4jSycKN4AyC5iFl1zW4PrPzeUma25BpDfCXrY9s300I0c1c1YPq4eFhwK2L1FzZYhVbj2LL7D8ZezifMuSLWOByhO06c8zGYVwZDRttnhIQMDgO6MDh0aZlNRzirCOryRoUoqNLtSMu5APqAlb7em6IEVn_-uE","scope":"GOOGLE","types":["locality","political"],"url":"https://maps.google.com/maps/place?q=Dijon,+France&ftid=0x47f29d8ceffd9675:0x409ce34b31458d0","vicinity":"Dijon","html_attributions":[]};
  $scope.lat = "";
  $scope.lng = "";

  $scope.results = [{face:"img/logo.png",name:"test", descr:"Lorem test"}];
  

  $scope.$watch('address', function(){
    console.log("changed location!");
    $scope.lat = $scope.address.geometry.location.lat();
    $scope.lng = $scope.address.geometry.location.lng();
    if($scope.lat) {
      $state.go('tab.results', {vicinity:$scope.address.vicinity, lat:$scope.lat, lng:$scope.lng, need:$scope.need});
    }
  }, true);

  $scope.$watch('need', function(oldValue,newValue){

    console.log(oldValue,newValue);
  }, true);


})

.controller('ResultsCtrl', function($scope,$state,$stateParams) {
   
    $scope.vicinity = $stateParams.vicinity;
    $scope.lat = $stateParams.lat;
    $scope.lng = $stateParams.lng;
    $scope.need = $stateParams.need;




})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
