(function() {
  'use strict';

  angular.module('myApp.ticTacToeCell', [])
  .controller('ticTacToeCellCtrl', ticTacToeCellCtrl)
  .$inject =
    ['$scope', '$log'];

  function ticTacToeCellCtrl($scope, $log) {
    $scope.setOwner = setOwner;
    $scope.init = init;

  
    function setOwner(rowNumber, colNumber, selectedTeam) {
      $scope.owner = selectedTeam;
      $scope.$parent.$parent.$parent.bordCheckWin[rowNumber][colNumber].value = selectedTeam;
      $log.debug($scope.$parent.$parent.$parent.bordCheckWin);
      if(!$scope.$parent.$parent.$parent.youWin(rowNumber, colNumber, selectedTeam, $scope.$parent.$parent.$parent.bordCheckWin)){
        changeOwner(selectedTeam);
      }
    }

    function changeOwner(selectedTeam) {
      $scope.$parent.$parent.$parent.selectedTeam = ((selectedTeam === 'team1') ? 'team2' : 'team1');
    }

    function init() {
      $scope.owner = null;
    }

  }
})();