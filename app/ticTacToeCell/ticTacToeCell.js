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
      $scope.$parent.$parent.bordCheckWin[rowNumber][colNumber].value = selectedTeam;
      $log.debug($scope.$parent.$parent.bordCheckWin);
      $scope.$parent.$parent.youWin(rowNumber, colNumber, selectedTeam, $scope.$parent.$parent.bordCheckWin);
      changeOwner(selectedTeam);
    }

    function changeOwner(selectedTeam) {
      $scope.$parent.$parent.selectedTeam = 'team2';
      if(selectedTeam === 'team2') {
        $scope.$parent.$parent.selectedTeam = 'team1';
      }
    }

    function init() {
      $scope.owner = null;
    }

  }
})();