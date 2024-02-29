console.log("schedulerCtrl");

var countryApp = angular.module("schedulerApp", []);
countryApp.controller("schedulerCtrl", function ($scope, $http) {

	$scope.sortField = "population";
	$scope.defaultView = "Month";
	$scope.canMoveAppointments = true;
	$scope.interval = 2;
	$scope.events = ALASKA_LARGE_DATA;
	$scope.users = [
		{
			"id": "76887d3f-6d8d-4c2c-bffa-a73f00e96bc3",
			"name": "Webb2, David",
			"initials": "DW"
		    }
	];
	$scope.selectedDate = {
		"_d": new Date()
	};
	$scope.daySelectedChange= (data, events) => {

	}
	$scope.eventActionPerformed= (data, events) => {

	}
	$scope.viewDateChanged= (data, events) => {

	}
});
