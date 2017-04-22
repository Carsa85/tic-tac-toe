(function() {
  'use strict';

  angular.module('myApp.gameBoard', ['ngRoute'])
  .controller('gameBoardCtrl', gameBoardCtrl)
  .directive('ticTacToeCellDirective', ticTacToeCellDirective)
  .$inject =
    ['$scope', '$log', '$rootScope', '$locatio'];

  function gameBoardCtrl($scope, $log, $rootScope, $location) {
  
    $scope.init = init;
    $scope.reset = reset;
    $scope.close = close;
    $scope.setFirst = setFirst;
    $scope.startGame = startGame;
    $scope.youWin = youWin;

    init();

    function setFirst(value) {
      $scope.selectedTeam = value;
    }

    function startGame(value) {
      $scope.isGameStart = true;
    }

    function createBordCheckWin(gameBoardConfiguration) {

      for(var row = 0; row < gameBoardConfiguration.rows; row++){
        $scope.bordCheckWin[row] = {};
        for(var col = 0; col < gameBoardConfiguration.cols; col++){
          $scope.bordCheckWin[row][col] = {value:null};
        }
      }
    }

    function youWin(rowNumber, colNumber, selectedTeam, bordCheckWin) {
      
      if(checkCol(rowNumber, colNumber, selectedTeam, bordCheckWin)){
        
      }
      else if(checkRow(rowNumber, colNumber, selectedTeam, bordCheckWin)){
        
      }
      else if(checkDiagonal(rowNumber, colNumber, selectedTeam, bordCheckWin)){
        
      }
      else if(checkOppositeDiagonal(rowNumber, colNumber, selectedTeam, bordCheckWin)){
        
      }
      
    }

    function init() {
      $scope.bordCheckWin = {};
      $scope.selectedTeam = null;
      $scope.isGameStart = false;
      $scope.gameBoardConfiguration = $rootScope.gameConfiguration;
      $log.debug($rootScope.gameConfiguration);
      $log.debug($scope.gameBoardConfiguration);
      createBordCheckWin($scope.gameBoardConfiguration);
    }
    
    function reset() {
      init();
    }

    function close() {
      //Reset game configuration to default
      $rootScope.gameConfiguration = $rootScope.defaultConfiguration;
      $log.debug($rootScope.gameConfiguration);
      //Return tu home
      $location.path('/')
    }
  }

  function ticTacToeCellDirective() {
    return {
      restrict: 'E',
      templateUrl: 'ticTacToeCell/ticTacToeCell.html',
      controller: 'ticTacToeCellCtrl'
    };
  }
})();