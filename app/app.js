(function() {
  'use strict';

  // Declare app level module which depends on views, and components
  angular.module('myApp', [
    'ngRoute',
    'myApp.main',
    'myApp.configuration',
    'myApp.gameBoard',
    'myApp.ticTacToeCell'
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
    $rootScope.defaultConfiguration = {
      team1: "Team 1",
      team2: "Team 2",
      cols: 3,
      rows: 3
    };
    $rootScope.gameConfiguration = $rootScope.defaultConfiguration;
  }])
  .filter('range', function(){
    return function(n) {
      var res = [];
      for (var i = 0; i < n; i++) {
        res.push(i);
      }
      return res;
    };
  });
})();