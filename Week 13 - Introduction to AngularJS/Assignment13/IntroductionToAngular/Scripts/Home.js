angular.module("my-module", ["ng"])
  .controller("my-root-controller", ["$scope", "$http", function ($scope, $http) {
      $http.get("http://localhost:52025/Home/GetBattingOrder").then(function (data) {
          $scope.players = JSON.parse(data.data).BattingOrder;
      });
  }]);