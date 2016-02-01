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
    function( $scope, $http){
        $scope.submit = function(){
            $http.get('/api/itemSearch/' + $scope.item.id)
                .then(function(response){
                    $scope.item.jsonString = response.data;
                    $scope.itemObject = response.data;
                });
        }
    }])
