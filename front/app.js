var rsApp = angular.module('rsApp', [
    'chart.js'
]);

rsApp// Optional configuration
    .config(['ChartJsProvider', function (ChartJsProvider) {
        // Configure all charts
        ChartJsProvider.setOptions({
            colours: ['#31708f', '#bce8f1'],
            responsive: true,
            animation: true,
            animationSteps : 60,
            width: 500

        });
        // Configure all line charts
        ChartJsProvider.setOptions('Line', {
            datasetFill: true,
            animationEasing: "easeOutQuart",
            pointDot: false,
            pointDotRadius: 1,
            pointHitDetectionRadius : 1
        });
    }])
    .controller('MainCtrl', ['$scope','$http','$filter', function( $scope, $http, $filter){
            $scope.submitted = false;
            $scope.submit = function() {
                console.log($scope.item.id);
                $http.get('/api/itemSearch/' + $scope.item.id)
                    .then(function (response) {

                        if( response.data != 404 ) {
                            $scope.item.jsonString = response.data;
                            $scope.itemObject = response.data;
                            console.log('resonse was not null');
                            $('#searchResultInner').show();
                            $('#loading').hide();
                            $('#notFound').hide();
                        }
                        else{
                            console.log('response was null');
                            $scope.submitted = true;
                            $('#searchResultInner').hide();
                            $('#loading').hide();
                            $('#notFound').show();

                        }
                    }, function (response){
                        $('#loading').hide();
                        console.log('response was null');
                    });
                $('#searchResultInner').hide();
                $('#loading').show();

                $http.get('/api/itemGraph/' + $scope.item.id)
                    .then(function (response) {

                        /*
                         * @param json    : the json representing graphing data
                         * @param numDays : the number of days to display
                         * @param dataAr  : REFERENCED - dataArray to fill
                         * @param labelAR : REFERENCED - labelArray to fill
                         */
                        var plotGraph = function(json, numDays, callback){
                            //declare two arrays
                            var gData = [];

                            //build graphing data
                            var dataAr = [];
                            var i = 0;
                            for (var key in json) {
                                if(i > (180 - numDays) ) {
                                    if (json.hasOwnProperty(key)) {
                                        dataAr.push(json[key]);
                                    }
                                }
                                i++;
                            }

                            //build labels for the data
                            var i = 0;
                            var labelAr = []
                            for ( property in json){
                                if( i > (180 - numDays) ) {
                                    if(numDays == 180) {
                                        if (i % 10 == 0) {
                                            labelAr.push($filter('date')(property, "MM-dd"));
                                        } else {
                                            labelAr.push('');
                                        }
                                    }else if(numDays >= 90){
                                        if (i % 5 == 0) {
                                            labelAr.push($filter('date')(property, "MM-dd"));
                                        } else {
                                            labelAr.push('');
                                        }
                                    }else{
                                        labelAr.push($filter('date')(property, "MM-dd"));
                                    }
                                }
                                i++;
                            }

                            gData[0] = labelAr;
                            gData[1] = dataAr;

                            callback(gData);
                        }


                        //*****************************************************
                        //All Daily Pricing Data
                        var dailyJson   = response.data.daily;

                        $scope.day30Data    = [];
                        $scope.day30Labels  = [];
                        $scope.day90Data    = [];
                        $scope.day90Labels  = [];
                        $scope.day180Data   = [];
                        $scope.day180Labels = [];

                        plotGraph(dailyJson,30, function(ar){
                            $scope.day30Data.push(ar[1]);
                            $scope.day30Labels = ar[0];
                        });
                        plotGraph(dailyJson,90, function(ar){
                            $scope.day90Data.push(ar[1]);
                            $scope.day90Labels = ar[0];
                        });
                        plotGraph(dailyJson,180, function(ar){
                            $scope.day180Data.push(ar[1]);
                            $scope.day180Labels = ar[0];
                        });


                        //*****************************************************
                        //All Average Pricing Data
                        var averageJson = response.data.average;
                        $scope.day30DataAvg    = [];
                        $scope.day30LabelsAvg  = [];
                        $scope.day90DataAvg    = [];
                        $scope.day90LabelsAvg  = [];
                        $scope.day180DataAvg   = [];
                        $scope.day180LabelsAvg = [];

                        plotGraph(averageJson,30, function(ar){
                            $scope.day30DataAvg.push(ar[1]);
                            $scope.day30LabelsAvg = ar[0];
                        });
                        plotGraph(averageJson,90, function(ar){
                            $scope.day90DataAvg.push(ar[1]);
                            $scope.day90LabelsAvg = ar[0];
                        });
                        plotGraph(averageJson,180, function(ar){
                            $scope.day180DataAvg.push(ar[1]);
                            $scope.day180LabelsAvg = ar[0];
                        });


                    });
                $scope.submitted = true;
            }
        }]);