console.log("schedulerCtrl");

var countryApp = angular.module("countryApp", []);
countryApp.controller("CountryCtrl", function ($scope, $http) {

	$scope.sortField = "population";
});
