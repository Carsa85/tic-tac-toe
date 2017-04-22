(function() {
  'use strict';

  angular.module('myApp.gameBoard', ['ngRoute'])
  .controller('gameBoardCtrl', gameBoardCtrl)
  .$inject =
    ['$scope', '$log', '$rootScope'];

  function gameBoardCtrl($scope, $log, $rootScope) {

  }
})();