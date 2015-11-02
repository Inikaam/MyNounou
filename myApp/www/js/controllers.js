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
      console.log($scope.address);
      $state.go('tab.results', {vicinity:$scope.address.name, lat:$scope.lat, lng:$scope.lng, need:$scope.need});
    }
  }, true);

  $scope.$watch('need', function(oldValue,newValue){

    console.log(oldValue,newValue);
  }, true);


})

.controller('ResultsCtrl', function($scope,$state,$stateParams,$http) {
   
    $scope.vicinity = $stateParams.vicinity;
    $scope.lat = $stateParams.lat;
    $scope.lng = $stateParams.lng;
    $scope.need = $stateParams.need;
    $scope.results = {};

    $http.get('http://localhost:8080/api/nannies?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfaWQiOiI1NjI2NjU5YzU2ZDkwZWM4Y2ZlZjM3OTgiLCJsYXN0bmFtZSI6Ik1vdXNzZXQiLCJmaXJzdG5hbWUiOiJNeXJpYW0iLCJnZW5kZXIiOiJGIiwidHlwZSI6Im5hbm55IiwiYWdlIjo2MCwidGVsIjoiMDIzNDU2Nzg5MSIsImVtYWlsIjoibXlyaWFtLm1vdXNzZXRAZ21haWwuY29tIiwicHJpY2UiOjYuNSwiX192IjowLCJyZXN0cmljdGlvbnMiOlt7InJlYXNvbiI6IkNvbmfDqXMiLCJlbmQiOiIyMDE1LTEwLTIwVDE2OjIwOjI1LjgxNloiLCJzdGFydCI6IjIwMTUtMTAtMjBUMTY6MjA6MjUuODE2WiIsIl9pZCI6IjU2MjY2OWM5NDg0NzQzZDBkODM5NWMwZCJ9XSwiZGlzcG9zIjp7ImRpbSI6W10sInNhbSI6W10sInZlbiI6W10sImpldSI6W10sIm1lciI6W10sIm1hciI6W10sImx1biI6W119LCJjb21tZW50cyI6W3sidGV4dCI6IkNvbW1lbnRhaXJlIHN1cHBsw6ltZW50YWlyZSIsIm5vdGUiOjUsImRhdGUiOiIyMDE1LTEwLTIwVDE2OjAzOjU0Ljk4OFoiLCJpZF9wYXJlbnQiOiI1NjIyMTU0NjViY2QyYjNjYTQ3ZGIxYmMiLCJfaWQiOiI1NjI2NjVlYTU2ZDkwZWM4Y2ZlZjM3OWEifSx7InRleHQiOiJDb21tZW50YWlyZSBzdXBwbMOpbWVudGFpcmUiLCJub3RlIjo1LCJkYXRlIjoiMjAxNS0xMC0yMFQxNjoxNDoxNC40OTVaIiwiaWRfcGFyZW50IjoiNTYyMjE1NDY1YmNkMmIzY2E0N2RiMWJjIiwiX2lkIjoiNTYyNjY4NTY0ODQ3NDNkMGQ4Mzk1YzBhIn0seyJ0ZXh0IjoiQ29tbWVudGFpcmUgc3VwcGzDqW1lbnRhaXJlIiwibm90ZSI6NSwiZGF0ZSI6IjIwMTUtMTAtMjBUMTY6MTk6NDIuOTM2WiIsImlkX3BhcmVudCI6IjU2MjIxNTQ2NWJjZDJiM2NhNDdkYjFiYyIsIl9pZCI6IjU2MjY2OTllNDg0NzQzZDBkODM5NWMwYiJ9LHsidGV4dCI6IkNvbW1lbnRhaXJlIHN1cHBsw6ltZW50YWlyZSIsIm5vdGUiOjUsImRhdGUiOiIyMDE1LTEwLTIwVDE2OjIwOjI1LjgxNloiLCJpZF9wYXJlbnQiOiI1NjIyMTU0NjViY2QyYjNjYTQ3ZGIxYmMiLCJfaWQiOiI1NjI2NjljOTQ4NDc0M2QwZDgzOTVjMGMifV0sImRhdGVfdXBkIjoiMjAxNS0xMC0yMFQxNjowMjozNi4zMDFaIiwiZGF0ZV9hZGQiOiIyMDE1LTEwLTIwVDE2OjAyOjM2LjMwMVoifQ.eGvT3fTRJv-7_xEGXQNsEgz2uC4uSSxJZ1K27ZjSFPQ').then(function success(response){
      console.log(response);
      $scope.results = response.data;

    }, function error(response){
      console.log(response);
    });

    var token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfaWQiOiI1NjI2NjU5YzU2ZDkwZWM4Y2ZlZjM3OTgiLCJsYXN0bmFtZSI6Ik1vdXNzZXQiLCJmaXJzdG5hbWUiOiJNeXJpYW0iLCJnZW5kZXIiOiJGIiwidHlwZSI6Im5hbm55IiwiYWdlIjo2MCwidGVsIjoiMDIzNDU2Nzg5MSIsImVtYWlsIjoibXlyaWFtLm1vdXNzZXRAZ21haWwuY29tIiwicHJpY2UiOjYuNSwiX192IjowLCJyZXN0cmljdGlvbnMiOlt7InJlYXNvbiI6IkNvbmfDqXMiLCJlbmQiOiIyMDE1LTEwLTIwVDE2OjIwOjI1LjgxNloiLCJzdGFydCI6IjIwMTUtMTAtMjBUMTY6MjA6MjUuODE2WiIsIl9pZCI6IjU2MjY2OWM5NDg0NzQzZDBkODM5NWMwZCJ9XSwiZGlzcG9zIjp7ImRpbSI6W10sInNhbSI6W10sInZlbiI6W10sImpldSI6W10sIm1lciI6W10sIm1hciI6W10sImx1biI6W119LCJjb21tZW50cyI6W3sidGV4dCI6IkNvbW1lbnRhaXJlIHN1cHBsw6ltZW50YWlyZSIsIm5vdGUiOjUsImRhdGUiOiIyMDE1LTEwLTIwVDE2OjAzOjU0Ljk4OFoiLCJpZF9wYXJlbnQiOiI1NjIyMTU0NjViY2QyYjNjYTQ3ZGIxYmMiLCJfaWQiOiI1NjI2NjVlYTU2ZDkwZWM4Y2ZlZjM3OWEifSx7InRleHQiOiJDb21tZW50YWlyZSBzdXBwbMOpbWVudGFpcmUiLCJub3RlIjo1LCJkYXRlIjoiMjAxNS0xMC0yMFQxNjoxNDoxNC40OTVaIiwiaWRfcGFyZW50IjoiNTYyMjE1NDY1YmNkMmIzY2E0N2RiMWJjIiwiX2lkIjoiNTYyNjY4NTY0ODQ3NDNkMGQ4Mzk1YzBhIn0seyJ0ZXh0IjoiQ29tbWVudGFpcmUgc3VwcGzDqW1lbnRhaXJlIiwibm90ZSI6NSwiZGF0ZSI6IjIwMTUtMTAtMjBUMTY6MTk6NDIuOTM2WiIsImlkX3BhcmVudCI6IjU2MjIxNTQ2NWJjZDJiM2NhNDdkYjFiYyIsIl9pZCI6IjU2MjY2OTllNDg0NzQzZDBkODM5NWMwYiJ9LHsidGV4dCI6IkNvbW1lbnRhaXJlIHN1cHBsw6ltZW50YWlyZSIsIm5vdGUiOjUsImRhdGUiOiIyMDE1LTEwLTIwVDE2OjIwOjI1LjgxNloiLCJpZF9wYXJlbnQiOiI1NjIyMTU0NjViY2QyYjNjYTQ3ZGIxYmMiLCJfaWQiOiI1NjI2NjljOTQ4NDc0M2QwZDgzOTVjMGMifV0sImRhdGVfdXBkIjoiMjAxNS0xMC0yMFQxNjowMjozNi4zMDFaIiwiZGF0ZV9hZGQiOiIyMDE1LTEwLTIwVDE2OjAyOjM2LjMwMVoifQ.eGvT3fTRJv-7_xEGXQNsEgz2uC4uSSxJZ1K27ZjSFPQ"
    //var data = {email:"nanny2@nanny.fr",price:16.50, tel:"0606060606", type:"nanny", gender:"F", age:25, password:"coucou", lastname:"MacDonald", firstname:"Jeanne"};
    //var data = {pic:"http://www.stockvault.net/blog/wp-content/uploads/2013/11/Portrait-8.jpg"};

    // $http.put('http://localhost:8080/api/nannies/5632004a8663a2db06ccf04e/?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfaWQiOiI1NjI2NjU5YzU2ZDkwZWM4Y2ZlZjM3OTgiLCJsYXN0bmFtZSI6Ik1vdXNzZXQiLCJmaXJzdG5hbWUiOiJNeXJpYW0iLCJnZW5kZXIiOiJGIiwidHlwZSI6Im5hbm55IiwiYWdlIjo2MCwidGVsIjoiMDIzNDU2Nzg5MSIsImVtYWlsIjoibXlyaWFtLm1vdXNzZXRAZ21haWwuY29tIiwicHJpY2UiOjYuNSwiX192IjowLCJyZXN0cmljdGlvbnMiOlt7InJlYXNvbiI6IkNvbmfDqXMiLCJlbmQiOiIyMDE1LTEwLTIwVDE2OjIwOjI1LjgxNloiLCJzdGFydCI6IjIwMTUtMTAtMjBUMTY6MjA6MjUuODE2WiIsIl9pZCI6IjU2MjY2OWM5NDg0NzQzZDBkODM5NWMwZCJ9XSwiZGlzcG9zIjp7ImRpbSI6W10sInNhbSI6W10sInZlbiI6W10sImpldSI6W10sIm1lciI6W10sIm1hciI6W10sImx1biI6W119LCJjb21tZW50cyI6W3sidGV4dCI6IkNvbW1lbnRhaXJlIHN1cHBsw6ltZW50YWlyZSIsIm5vdGUiOjUsImRhdGUiOiIyMDE1LTEwLTIwVDE2OjAzOjU0Ljk4OFoiLCJpZF9wYXJlbnQiOiI1NjIyMTU0NjViY2QyYjNjYTQ3ZGIxYmMiLCJfaWQiOiI1NjI2NjVlYTU2ZDkwZWM4Y2ZlZjM3OWEifSx7InRleHQiOiJDb21tZW50YWlyZSBzdXBwbMOpbWVudGFpcmUiLCJub3RlIjo1LCJkYXRlIjoiMjAxNS0xMC0yMFQxNjoxNDoxNC40OTVaIiwiaWRfcGFyZW50IjoiNTYyMjE1NDY1YmNkMmIzY2E0N2RiMWJjIiwiX2lkIjoiNTYyNjY4NTY0ODQ3NDNkMGQ4Mzk1YzBhIn0seyJ0ZXh0IjoiQ29tbWVudGFpcmUgc3VwcGzDqW1lbnRhaXJlIiwibm90ZSI6NSwiZGF0ZSI6IjIwMTUtMTAtMjBUMTY6MTk6NDIuOTM2WiIsImlkX3BhcmVudCI6IjU2MjIxNTQ2NWJjZDJiM2NhNDdkYjFiYyIsIl9pZCI6IjU2MjY2OTllNDg0NzQzZDBkODM5NWMwYiJ9LHsidGV4dCI6IkNvbW1lbnRhaXJlIHN1cHBsw6ltZW50YWlyZSIsIm5vdGUiOjUsImRhdGUiOiIyMDE1LTEwLTIwVDE2OjIwOjI1LjgxNloiLCJpZF9wYXJlbnQiOiI1NjIyMTU0NjViY2QyYjNjYTQ3ZGIxYmMiLCJfaWQiOiI1NjI2NjljOTQ4NDc0M2QwZDgzOTVjMGMifV0sImRhdGVfdXBkIjoiMjAxNS0xMC0yMFQxNjowMjozNi4zMDFaIiwiZGF0ZV9hZGQiOiIyMDE1LTEwLTIwVDE2OjAyOjM2LjMwMVoifQ.eGvT3fTRJv-7_xEGXQNsEgz2uC4uSSxJZ1K27ZjSFPQ&pic=http://www.stockvault.net/blog/wp-content/uploads/2013/11/Portrait-8.jpg').then(function success(response){
    //   console.log(response);

    // }, function error(response){
    //   console.log(response);
    // });



})

.controller('ResultCtrl', function($scope,$state,$stateParams,$http) {
   

    $scope.id = $stateParams.id;

    $http.get('http://localhost:8080/api/nannies/'+ $scope.id +'?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfaWQiOiI1NjI2NjU5YzU2ZDkwZWM4Y2ZlZjM3OTgiLCJsYXN0bmFtZSI6Ik1vdXNzZXQiLCJmaXJzdG5hbWUiOiJNeXJpYW0iLCJnZW5kZXIiOiJGIiwidHlwZSI6Im5hbm55IiwiYWdlIjo2MCwidGVsIjoiMDIzNDU2Nzg5MSIsImVtYWlsIjoibXlyaWFtLm1vdXNzZXRAZ21haWwuY29tIiwicHJpY2UiOjYuNSwiX192IjowLCJyZXN0cmljdGlvbnMiOlt7InJlYXNvbiI6IkNvbmfDqXMiLCJlbmQiOiIyMDE1LTEwLTIwVDE2OjIwOjI1LjgxNloiLCJzdGFydCI6IjIwMTUtMTAtMjBUMTY6MjA6MjUuODE2WiIsIl9pZCI6IjU2MjY2OWM5NDg0NzQzZDBkODM5NWMwZCJ9XSwiZGlzcG9zIjp7ImRpbSI6W10sInNhbSI6W10sInZlbiI6W10sImpldSI6W10sIm1lciI6W10sIm1hciI6W10sImx1biI6W119LCJjb21tZW50cyI6W3sidGV4dCI6IkNvbW1lbnRhaXJlIHN1cHBsw6ltZW50YWlyZSIsIm5vdGUiOjUsImRhdGUiOiIyMDE1LTEwLTIwVDE2OjAzOjU0Ljk4OFoiLCJpZF9wYXJlbnQiOiI1NjIyMTU0NjViY2QyYjNjYTQ3ZGIxYmMiLCJfaWQiOiI1NjI2NjVlYTU2ZDkwZWM4Y2ZlZjM3OWEifSx7InRleHQiOiJDb21tZW50YWlyZSBzdXBwbMOpbWVudGFpcmUiLCJub3RlIjo1LCJkYXRlIjoiMjAxNS0xMC0yMFQxNjoxNDoxNC40OTVaIiwiaWRfcGFyZW50IjoiNTYyMjE1NDY1YmNkMmIzY2E0N2RiMWJjIiwiX2lkIjoiNTYyNjY4NTY0ODQ3NDNkMGQ4Mzk1YzBhIn0seyJ0ZXh0IjoiQ29tbWVudGFpcmUgc3VwcGzDqW1lbnRhaXJlIiwibm90ZSI6NSwiZGF0ZSI6IjIwMTUtMTAtMjBUMTY6MTk6NDIuOTM2WiIsImlkX3BhcmVudCI6IjU2MjIxNTQ2NWJjZDJiM2NhNDdkYjFiYyIsIl9pZCI6IjU2MjY2OTllNDg0NzQzZDBkODM5NWMwYiJ9LHsidGV4dCI6IkNvbW1lbnRhaXJlIHN1cHBsw6ltZW50YWlyZSIsIm5vdGUiOjUsImRhdGUiOiIyMDE1LTEwLTIwVDE2OjIwOjI1LjgxNloiLCJpZF9wYXJlbnQiOiI1NjIyMTU0NjViY2QyYjNjYTQ3ZGIxYmMiLCJfaWQiOiI1NjI2NjljOTQ4NDc0M2QwZDgzOTVjMGMifV0sImRhdGVfdXBkIjoiMjAxNS0xMC0yMFQxNjowMjozNi4zMDFaIiwiZGF0ZV9hZGQiOiIyMDE1LTEwLTIwVDE2OjAyOjM2LjMwMVoifQ.eGvT3fTRJv-7_xEGXQNsEgz2uC4uSSxJZ1K27ZjSFPQ').then(function success(response){
      console.log(response);
      $scope.result = response.data.data;

    }, function error(response){
      console.log(response);
    });




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
