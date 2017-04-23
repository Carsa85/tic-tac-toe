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
    $scope.goToHome = goToHome;
  
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

    function updateStats(selectedTeam) {
      var stats = $rootScope.statistics;
      var teamWinner = selectedTeam; 
      var teamLouser = ((selectedTeam === 'team1') ? 'team2' : 'team1');
      if (stats.filter(function(e){return e.team == $scope.gameBoardConfiguration[teamWinner]}).length > 0) {
        stats[stats.map(function(e) { return e.team; }).indexOf($scope.gameBoardConfiguration[teamWinner])].plaied = stats[stats.map(function(e) { return e.team; }).indexOf($scope.gameBoardConfiguration[teamWinner])].plaied + 1;
        stats[stats.map(function(e) { return e.team; }).indexOf($scope.gameBoardConfiguration[teamWinner])].win = stats[stats.map(function(e) { return e.team; }).indexOf($scope.gameBoardConfiguration[teamWinner])].win + 1;
      } else {
        stats.push({
          team: $scope.gameBoardConfiguration[teamWinner],
          plaied: 1,
          win: 1
        });
      }
      if (stats.filter(function(e){return e.team == $scope.gameBoardConfiguration[teamLouser]}).length > 0) {
        stats[stats.map(function(e) { return e.team; }).indexOf($scope.gameBoardConfiguration[teamLouser])].plaied = stats[stats.map(function(e) { return e.team; }).indexOf($scope.gameBoardConfiguration[teamLouser])].plaied + 1;
      } else {
        stats.push({
          team: $scope.gameBoardConfiguration[teamLouser],
          plaied: 1,
          win: 0
        });
      }
      $rootScope.statistics = stats;
      $scope.score[teamWinner] = $scope.score[teamWinner] + 1; 
    }

    function youWin(rowNumber, colNumber, selectedTeam, bordCheckWin) {
      
      if(checkCol(rowNumber, colNumber, selectedTeam, bordCheckWin)) {
        $scope.isGameStop = true;
        updateStats(selectedTeam);
        $log.debug($scope.gameBoardConfiguration[selectedTeam] + ' win col');
        return true;
      }
      else if(checkRow(rowNumber, colNumber, selectedTeam, bordCheckWin)) {
        $scope.isGameStop = true;
        updateStats(selectedTeam);
        $log.debug($scope.gameBoardConfiguration[selectedTeam] + ' win row');
        return true;
      }
      else if(checkDiagonal(rowNumber, colNumber, selectedTeam, bordCheckWin)) {
        $scope.isGameStop = true;
        updateStats(selectedTeam);
        $log.debug($scope.gameBoardConfiguration[selectedTeam] + ' win diagonals');
        return true;
      }
      else if(checkOppositDiagonal(rowNumber, colNumber, selectedTeam, bordCheckWin)) {
        $scope.isGameStop = true;
        updateStats(selectedTeam);
        $log.debug($scope.gameBoardConfiguration[selectedTeam] + ' win opposit diagonals');
        return true;
      }

      return false;
    }

    function checkRow(rowNumber, colNumber, selectedTeam, bordCheckWin) {
      var start = colNumber - ($scope.gameBoardConfiguration.forWin - 1);
      var stop = colNumber + ($scope.gameBoardConfiguration.forWin - 1);
      if(start < 0) {
        start = 0
      }
      if(stop >= $scope.gameBoardConfiguration.cols) {
        stop = $scope.gameBoardConfiguration.cols - 1
      }

      for (start; start <= stop - ($scope.gameBoardConfiguration.forWin - 1); start++){
        if(checkWin(rowNumber, start, $scope.gameBoardConfiguration.forWin, selectedTeam, bordCheckWin, 1)) {
          return true;
        }
      }

      return false;
    }

    function checkCol(rowNumber, colNumber, selectedTeam, bordCheckWin) {
      var start = rowNumber - ($scope.gameBoardConfiguration.forWin - 1);
      var stop = rowNumber + ($scope.gameBoardConfiguration.forWin - 1);
      if(start < 0) {
        start = 0
      }
      if(stop >= $scope.gameBoardConfiguration.rows) {
        stop = $scope.gameBoardConfiguration.rows - 1
      }

      for (start; start <= stop - ($scope.gameBoardConfiguration.forWin - 1); start++){
        if(checkWin(start, colNumber, $scope.gameBoardConfiguration.forWin, selectedTeam, bordCheckWin, 2)) {
          return true;
        }
      }

      return false;
    }

    function checkDiagonal(rowNumber, colNumber, selectedTeam, bordCheckWin) {
      
      var startRow = rowNumber - ($scope.gameBoardConfiguration.forWin - 1);
      var stopRow = rowNumber + ($scope.gameBoardConfiguration.forWin - 1);
      var startCol = colNumber - ($scope.gameBoardConfiguration.forWin - 1);
      var stopCol = colNumber + ($scope.gameBoardConfiguration.forWin - 1);

      if(startCol < 0) {
        startRow = stopRow - stopCol;
        startCol = 0;
      }
      if(startRow < 0) {
        startCol = stopCol - stopRow;
        startRow = 0;
      }
      if(stopRow > $scope.gameBoardConfiguration.rows - 1) {
        stopCol = stopCol - (stopRow - $scope.gameBoardConfiguration.rows) - 1;
        stopRow = $scope.gameBoardConfiguration.rows - 1;
      }
      if(stopCol > $scope.gameBoardConfiguration.cols - 1) {
        stopRow = stopRow - (stopCol - $scope.gameBoardConfiguration.cols) - 1;
        stopCol = $scope.gameBoardConfiguration.cols - 1;
      }

      for (startRow, startCol; startRow <= stopRow - ($scope.gameBoardConfiguration.forWin - 1) && startCol <= stopCol - ($scope.gameBoardConfiguration.forWin - 1); startRow++, startCol++){
        if(checkWin(startRow, startCol, $scope.gameBoardConfiguration.forWin, selectedTeam, bordCheckWin, 3)) {
          return true;
        }
      }

      return false;
    }

    function checkOppositDiagonal(rowNumber, colNumber, selectedTeam, bordCheckWin) {
      
      var startRow = rowNumber + ($scope.gameBoardConfiguration.forWin - 1);
      var stopRow = rowNumber - ($scope.gameBoardConfiguration.forWin - 1);
      var startCol = colNumber - ($scope.gameBoardConfiguration.forWin - 1);
      var stopCol = colNumber + ($scope.gameBoardConfiguration.forWin - 1);

      if(stopRow < 0) {
        stopCol = stopCol + stopRow;
        stopRow = 0;
      }
      if(startCol < 0) {
        startRow = startRow + startCol;
        startCol = 0;
      }

      if(startRow > $scope.gameBoardConfiguration.rows - 1) {
        startCol = startCol + (startRow - $scope.gameBoardConfiguration.rows) + 1;
        startRow = $scope.gameBoardConfiguration.rows - 1;
      }
      if(stopCol > $scope.gameBoardConfiguration.cols - 1) {
        stopRow = stopRow + (stopCol - $scope.gameBoardConfiguration.cols) + 1;
        stopCol = $scope.gameBoardConfiguration.cols - 1;
      }

      for (startRow, startCol; startRow >= stopRow - ($scope.gameBoardConfiguration.forWin - 1) && startCol <= stopCol - ($scope.gameBoardConfiguration.forWin - 1); startRow--, startCol++){
        if(checkWin(startRow, startCol, $scope.gameBoardConfiguration.forWin, selectedTeam, bordCheckWin, 4)) {
          return true;
        }
      }

      return false;
    }

    function checkWin(row, col, tic, selectedTeam, bordCheckWin, type) {

      var occurrences = 0;
      var i;
      var youWin = false;

      switch(type) {
        case 1:
        //Check win in row
          for(i = 0; i < tic; i++, col++) {
            if(bordCheckWin[row][col].value === selectedTeam){
              occurrences = occurrences + 1;
            }
          }
          break;
        case 2:
        //Check win in col
          for(i = 0; i < tic; i++, row++) {
            if(bordCheckWin[row][col].value === selectedTeam){
              occurrences = occurrences + 1;
            }
          }
          break;
        case 3:
        //Check win in diagonar
          for(i = 0; i < tic; i++, col++, row++) {
            if(bordCheckWin[row][col].value === selectedTeam){
              occurrences = occurrences + 1;
            }
          }
          break;
        case 4:
        //Check win in opposit diagonal
          for(i = 0; i < tic; i++, col++, row--) {
            if(bordCheckWin[row][col].value === selectedTeam){
              occurrences = occurrences + 1;
            }
          }
          break;
      }

      if(occurrences === tic){
        youWin = true;
      }

      return youWin;

    }

    function goToHome() {
      //Start game
      $location.path('/');
    }

    function init() {
      $scope.bordCheckWin = {};
      $scope.selectedTeam = null;
      $scope.isGameStart = false;
      $scope.isGameStop = false;
      $scope.score = {
        team1: 0,
        team2: 0
      };
      $scope.gameBoardConfiguration = $rootScope.gameConfiguration;
      $log.debug($rootScope.gameConfiguration);
      $log.debug($scope.gameBoardConfiguration);
      createBordCheckWin($scope.gameBoardConfiguration);
    }
    
    function reset() {
      $scope.bordCheckWin = {};
      $scope.selectedTeam = (($scope.selectedTeam === 'team1') ? 'team2' : 'team1');
      $scope.isGameStart = true;
      $scope.isGameStop = false;
      createBordCheckWin($scope.gameBoardConfiguration);
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
