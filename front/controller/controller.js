var rsAppControllers = angular.module('rsAppControllers',[]);


rsAppControllers.controller('searchCtrl', ['$scope','$http',
function( $scope, $http){
   $scope.submit = function(){
       $http.get('/api/itemSearch/' + $scope.item.id)
       .then(function(response){
           $scope.item.jsonString = response.data;
           $scope.itemObject = response.data;
       });
   }
}])

rsAppControllers.controller('homeCtrl', ['$scope','$http',
    function( $scope, $http, $location){
        $scope.submitted = false;

            $scope.changeView = function(view){
                $location.path(view); // path not hash
            }
            $scope.submit = function() {
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
                        //$scope.graphData.jsonString = response.data;
                        var graphObj = response.data;
                        //arr = Object.keys(graphObj.daily).map(function (key) {return graphObj.daily[key]});
                        //$scope.graphData = arr;
                    });
                $scope.submitted = true;

            }
    }]);

