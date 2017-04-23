(function() {
  'use strict';

  angular.module('myApp.statistics', ['ngRoute'])
  .controller('statisticsCtrl', statisticsCtrl)
  .$inject =
    ['$scope', '$rootScope', '$log'];

  function statisticsCtrl($scope, $rootScope, $log) {
    $scope.init = init;

    init();

    function init() {
      $scope.statistics = $rootScope.statistics;
      console.log($scope.statistics)
    }
  }
})();