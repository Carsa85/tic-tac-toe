(function() {
  'use strict';

  angular.module('myApp.main', ['ngRoute'])
  .controller('mainCtrl', mainCtrl)
  .$inject =
    ['$scope'];

  function mainCtrl($scope) {
    $scope.init = init;

    function init() {}
  }
})();