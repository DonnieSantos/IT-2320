function myController($scope) {
}

angular.element(document).ready(function ($scope) {

    $.getJSON("http://localhost:52025/Home/GetBattingOrder", {}, function (data) {

        data = JSON.parse(data);

        $scope.battingOrder = [];

        for (var i=0; i<data.BattingOrder.length; i++)
        {
            $scope.battingOrder.push({
                "FirstName": data.BattingOrder[i].FirstName,
                "LastName": data.BattingOrder[i].LastName
            });
        }

        // This doesn't work. "$scope.$apply is not a function"
        // $scope.$apply();
    });
});