/**
 * Created by mayaj on 2015-09-18.
 */
app.factory('loginS', ['$rootScope', '$q', '$state', 'property', '$http', '$localStorage',
    function($rootScope, $q, $state, property, $http, $localStorage){
        var service = {
            autoLogin: function() {
                var asy = $q.defer();
                var token = $localStorage.get('token') || false;
                if(token) {
                    $http.post(property.api.login + 'token', {token: token}).success(function (data){
                        $rootScope.admin = data;
                        asy.resolve(data);
                    }).error(function(data){
                        $rootScope.admin = null;
                        $localStorage.remove('token');
                        asy.reject(data);
                    });
                }else{
                    asy.resolve('');
                }

                return asy.promise;
            },
            doLogin : function(login){
                var asy = $q.defer();
                $http.post(property.api.login, login).success(function (data){
                    $rootScope.admin = data;
                    if(login.autoLogin) {
                        $localStorage.set('token', data.token);
                    }
                    asy.resolve(data);
                }).error(function(data){
                    $rootScope.admin = null;
                    asy.reject(data);
                });
                return asy.promise;
            },
            logout : function(){
                $http.get(property.api.login + 'logout').success(function(){
                    $rootScope.admin = null;
                    $state.go('login');
                });
            },
            // Ask the backend to see if a user is already authenticated - this may be from a previous session.
            getLoginInfo: function() {
                var asy = $q.defer();
                $http.get(property.api.login + 'get').success(function(data) {
                    $rootScope.admin = data;
                    asy.resolve(data);
                });
                return asy.promise;
            }
        };

        return service;
    }]);