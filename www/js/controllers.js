angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('OrdersCtrl', function($scope, $stateParams, $http) {


 //Get Order Data START
   $scope.orders = [];
     $scope.totalOrders = 0;

  var urlBase = 'https://api.eu.apiconnect.ibmcloud.com/cmarcoliukibmcom-sandpit/sb/api/';

  var headersBase =
  {
    'X-IBM-Client-Id': '934e080e-25ca-4c00-b904-843ec01f39f9',
    'X-IBM-Client-Secret': 'rA2pI3bX5yL6sM2vW7fA5rQ1pC0yO5lR6eB0hK3hT6bS5fR1eI',
    'content-type': 'application/json',
    'accept': 'application/json'
  }

  var urlModified = urlBase + 'Orders';

    var req = {
   method: 'GET',
   url: urlModified,
   headers: headersBase
  }

  $http(req).then(function(response){
    console.log(JSON.stringify(response));
      $scope.orders = response.data;
      $scope.totalOrders =  $scope.orders.length;
      console.log("total orders " + $scope.totalOrders);
  });
//Get Order Data END


})



.controller('OrderDetailsCtrl', function($scope, $stateParams, $location, $http) {

  // $scope.order =
  //
  //   {
  //   customerId: 1001,
  //   description: "iPhone 6S",
  //   imageUrl: "https://c2.staticflickr.com/2/1577/25383236530_a063267d16_b.jpg",
  //   orderId: $location.search().theId
  // };


console.log("Inside order details controller");


//Get Order Details Data START
  $scope.orderId = $location.search().theId;
  $scope.orderDescription = $location.search().description;
  $scope.orderDetails = [];



 var urlBase = 'https://api.eu.apiconnect.ibmcloud.com/cmarcoliukibmcom-sandpit/sb/api/';

 var headersBase =
 {
   'X-IBM-Client-Id': '934e080e-25ca-4c00-b904-843ec01f39f9',
   'X-IBM-Client-Secret': 'rA2pI3bX5yL6sM2vW7fA5rQ1pC0yO5lR6eB0hK3hT6bS5fR1eI',
   'content-type': 'application/json',
   'accept': 'application/json'
 }

 var urlModified = urlBase + 'Orders/' + $scope.orderId + '/events';

   var req = {
  method: 'GET',
  url: urlModified,
  headers: headersBase
 }

 $http(req).then(function(response){
   console.log(JSON.stringify(response));
     $scope.orderDetails = response.data;
 });
//Get Order Details Data END





});
