(function() {
  'use strict';

  angular.module('myApp.configuration', ['ngRoute'])
  .controller('configurationCtrl', configurationCtrl)
  .$inject =
    ['$scope', '$log', '$rootScope', '$location'];

  function configurationCtrl($scope, $log, $rootScope, $location) {
    $scope.customGameConfiguration = {}
    $scope.setConfiguration = setConfiguration;

    function setConfiguration() {
      //set game configuration
      $log.debug($scope.customGameConfiguration);
      $rootScope.gameConfiguration = $scope.customGameConfiguration;
      $log.debug($rootScope.gameConfiguration);
      //Start game
      $location.path('/gameBoard')
    }
  }
})();