/**
 * Created by mayaj on 2015-09-18.
 */
app
    .controller('loginC', ['$scope', 'loginS', '$state', '$rootScope',
        function($scope, loginS, $state, $rootScope){
            $rootScope.admin = null;
            $scope.login = {};

            $scope.doLogin = function() {
                $scope.login.error = null;
                loginS.doLogin($scope.login).then(function(){
                    $state.go('main');
                }, function(err){
                    $scope.login.error = err;
                });
            }
        }]);