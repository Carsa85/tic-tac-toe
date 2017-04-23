(function() {
  'use strict';

  angular.module('myApp.configuration', ['ngRoute'])
  .controller('configurationCtrl', configurationCtrl)
  .$inject =
    ['$scope', '$log', '$rootScope', '$location'];

  function configurationCtrl($scope, $log, $rootScope, $location) {
    $scope.setConfiguration = setConfiguration;
    $scope.startGame = startGame;
    $scope.init = init;

    init();

    function setConfiguration() {
      //set game configuration
      $log.debug($scope.customGameConfiguration);
      $rootScope.gameConfiguration = $scope.customGameConfiguration;
      $log.debug($rootScope.gameConfiguration);
      $scope.myForm.$setPristine();
      $scope.myForm.$setUntouched();
      init();
    }

    function startGame() {
      //Start game
      $location.path('/gameBoard');
    }

    function init() {
      $scope.customGameConfiguration = {};
    }
  }
})();