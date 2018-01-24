angular.module('starter.controllers', ['ionic'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $ionicPlatform, $state) {

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

  $ionicPlatform.ready(function() {
    var platform = ionic.Platform.platform();
    console.log(platform);
    if(platform == 'android'){
      getAndroidSystemPrefs();
    }
    if(platform == 'ios'){
      getIosUserPrefs();
    }
  });

  $ionicPlatform.on("pause", function (event) {
    console.log("pause app");
  });

  $ionicPlatform.on("resume", function (event) {
    var platform = ionic.Platform.platform();
    console.log("resume app");
    if(platform == 'android'){
      getAndroidSystemPrefs();
    }
    if(platform == 'ios'){
      getIosUserPrefs();
    }
  });

  function getAndroidSystemPrefs(){
    var prefs = plugins.appPreferences;
    var suitePrefs = prefs.suite ("prefs");
    console.log('window.plugins', suitePrefs);

    suitePrefs.fetch(function (value){
      console.log('conteo de clicks widget: ', value);
    }, function(error){
      console.log('error: ', error);
    }, 'conteo');

    suitePrefs.fetch( function(value){
      console.log(value);
      if(value === true){
        $state.go('app.browse');
        suitePrefs.store (function(value){
          console.log(value);
        }, function(error){
          console.log(error);
        },'widgetUpdate', false);
      }
    }, function(error) {
      console.log(error);
    }, 'widgetUpdate');
  }

  function getIosUserPrefs(){
    var prefs = plugins.appPreferences;
    var suitePrefs = prefs.suite ("group.testing.widget.v1");

    suitePrefs.fetch( function(value){
      console.log(value);
      if(value === true){
        $state.go('app.browse');
        suitePrefs.store (function(value){
          console.log(value);
        }, function(error){
          console.log(error);
        },'widgetClicked', false);
      }
    }, function(error) {
      console.log(error);
    }, 'widgetClicked');
  }
  



})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
});
