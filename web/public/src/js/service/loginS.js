/**
 * Created by 동준 on 2015-09-18.
 */
app.factory('loginS', ['$rootScope', '$q', 'property', '$http', '$uibModal', 'loginAfterQ', '$localStorage',
    function($rootScope, $q, property, $http, $uibModal, loginAfterQ, $localStorage){
        var loginDialog = null;
        function openLoginDialog() {
            if ( loginDialog ) {
                throw new Error('Trying to open a dialog that is already open!');
            }
            loginDialog = $uibModal.open({
                animation: true,
                templateUrl: 'login/login.tpl.html',
                controller: 'loginC'
            });

            return loginDialog;
        }

        loginAfterQ.onItemAddedCallbacks.push(function() {
            if ( loginAfterQ.hasMore() ) {
                service.openLoginModal();
            }
        });

        var service = {
            autoLogin: function() {
                var token = $localStorage.get('token') || false;
                if(token) {
                    var asy = $q.defer();
                    $http.post(property.api.login + 'token', {token: token}).success(function (data){
                        $rootScope.user = data;
                        asy.resolve(data);
                    }).error(function(data){
                        $rootScope.user = null;
                        $localStorage.remove('token');
                        asy.reject(data);
                    });
                    return asy.promise;
                }
            },
            openLoginModal: function() {
                openLoginDialog().result.then({}, function () {
                    loginDialog = null;
                    if (!!$rootScope.user) {
                        loginAfterQ.retryAll();
                     } else {
                        loginAfterQ.cancelAll();
                        /*location.href= '/';*/
                     }
                });
            },
            doLogin : function(login){
                var asy = $q.defer();
                $http.post(property.api.login, login).success(function (data){
                    $rootScope.user = data;
                    asy.resolve(data);
                }).error(function(data){
                    asy.reject(data);
                });
                return asy.promise;
            },
            logout : function(){
                var asy = $q.defer();
                $http.get(property.api.login + 'logout').success(function(){
                    delete $rootScope.user;
                    $localStorage.remove('token');
                    asy.resolve();
                });
                return asy.promise;
            },
            getLoginInfo: function() {
                var asy = $q.defer();
                $http.post(property.api.login + 'get', {}).success(function(data) {
                    $rootScope.user = data;
                    asy.resolve( $rootScope.user);
                });
                return asy.promise;
            }
        };

        return service;
    }]);