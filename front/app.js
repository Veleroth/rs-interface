var rsApp = angular.module('rsApp', [
    'chart.js'
]);


rsApp// Optional configuration
    .config(['ChartJsProvider', function (ChartJsProvider) {
        // Configure all charts
        ChartJsProvider.setOptions({
            colours: ['#FF5252', '#FF8A80'],
            responsive: true
        });
        // Configure all line charts
        ChartJsProvider.setOptions('Line', {
            datasetFill: false
        });
    }])
    .controller("LineCtrl", ['$scope', '$timeout', function ($scope, $timeout) {

        $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
        $scope.graphData = [
            [65, 59, 80, 81, 56, 55, 40],
        ];

    }])
    .controller('MainCtrl', ['$scope','$http','$filter', function( $scope, $http, $filter){
            $scope.submitted = false;

            $scope.submit = function() {
                console.log($scope.item.id);
                $http.get('/api/itemSearch/' + $scope.item.id)
                    .then(function (response) {
                        if(response != null) {
                            $scope.item.jsonString = response.data;
                            $scope.itemObject = response.data;
                            console.log('resonse was not null');
                        }
                        else{
                            console.log('response was null');
                            $scope.submitted = false;
                        }
                    });


                $http.get('/api/itemGraph/' + $scope.item.id)
                    .then(function (response) {

                        //assign the returned json to arrays
                        var dailyJson   = response.data.average;
                        var averageJson = response.data.average;

                        //declare two arrays
                        var gData = [];
                        var gLabels = [];
                        $scope.dailyGraphArLabels = [];
                        $scope.dailyGraphArData = [];

                        i = 0;
                        for (var key in dailyJson) {
                            if(i > 150) {
                                if (dailyJson.hasOwnProperty(key)) {
                                    gData.push(dailyJson[key]);
                                }
                            }
                            i++;
                        }
                        $scope.dailyGraphArData.push(gData);

                        i = 0;
                        for ( property in dailyJson){
                            if( i > 150) {
                                $scope.dailyGraphArLabels.push($filter('date')(property, "MM-dd"));
                            }
                            i++;
                        }


                        //test output the data
                        console.log('dailyGraphArData: ' + $scope.dailyGraphArData);
                        console.log('dailyGraphLabels: ' + $scope.dailyGraphArLabels);
                    });
                $scope.submitted = true;
            }
        }]);