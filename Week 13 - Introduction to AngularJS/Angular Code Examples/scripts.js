function personController($scope)
{
	$scope.viewModel = {};
	$scope.viewModel.currentTime = new Date().toString();
	$scope.viewModel.firstName = "Donnie";
	$scope.viewModel.lastName = "Santos";

	$scope.viewModel.Add = function(x, y)
	{
		return x + y;
	}

	$scope.viewModel.list = [
		{ name: 'Item One', value: 100 },
		{ name: 'Item Two', value: 200 },
		{ name: 'Item Three', value: 300 }
	];
}