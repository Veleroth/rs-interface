var rsApp = angular.module('rsApp', [
    'ngRoute',
    'rsAppControllers'
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
])