(function() {
  'use strict';

  // Declare app level module which depends on views, and components
  angular.module('myApp', [
    'ngRoute',
    'myApp.main',
    'myApp.configuration',
    'myApp.gameBoard'
  ]).
  config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
    $routeProvider.when('/', {
      templateUrl: 'main/main.html',
      controller: 'mainCtrl'
    })
    .when('/configuration', {
      templateUrl: 'configuration/configuration.html',
      controller: 'configurationCtrl'
    })
    .when('/gameBoard', {
      templateUrl: 'gameBoard/gameBoard.html',
      controller: 'gameBoardCtrl'
    })
    .otherwise({redirectTo: '/'});
  }])
  .run(['$rootScope', function($rootScope) {
    $rootScope.gameConfiguration = {
      team1: "Team 1",
      team2: "Team 2",
      cols: 3,
      rows: 3
    };
  }]);
})();