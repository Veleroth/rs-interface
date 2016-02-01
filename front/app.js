var rsApp = angular.module('rsApp', [
    'ngRoute',
    'rsAppControllers',
    'chart.js'
]);


rsApp.config(['$routeProvider',
    function($routeProvider){
        $routeProvider
        .when('/home', {
            templateUrl : 'views/homeView.html',
            controller  : 'homeCtrl'
        })
        .when('/search', {
            templateUrl : 'views/searchView.html',
            controller  : 'searchCtrl'
        })
    }
]);

rsApp// Optional configuration
    .config(['ChartJsProvider', function (ChartJsProvider) {
        // Configure all charts
        ChartJsProvider.setOptions({
            colours: ['#FF5252', '#FF8A80'],
            responsive: false
        });
        // Configure all line charts
        ChartJsProvider.setOptions('Line', {
            datasetFill: false
        });
    }])
    .controller("LineCtrl", ['$scope', '$timeout', function ($scope, $timeout) {

        $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
        $scope.series = ['Series A', 'Series B'];
        $scope.data = [
            [65, 59, 80, 81, 56, 55, 40],
            [28, 48, 40, 19, 86, 27, 90]
        ];
        $scope.onClick = function (points, evt) {
            console.log(points, evt);
        };

        // Simulate async data update
        $timeout(function () {
            $scope.data = [
                [28, 48, 40, 19, 86, 27, 90],
                [65, 59, 80, 81, 56, 55, 40]
            ];
        }, 3000);
    }]);
