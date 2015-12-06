/**
 * Created by 동준 on 2015-10-11.
 */
app.factory('joinS', ['$q', 'property', '$http', 'loginS', '$uibModal',
    function($q, property, $http, loginS, $uibModal){
        /*var joinModal = $modal({templateUrl: 'join/join.tpl.html', show: false, controller: 'joinC'});*/
        var service = {
            openJoinModal: function() {
                $uibModal.open({
                    animation: true,
                    templateUrl: 'join/join.tpl.html',
                    controller: 'joinC'
                });
            },
            join: function(params){
                var asy = $q.defer();
                $http.post(property.api.join, params).success(function (){
                    loginS.doLogin(params);
                    asy.resolve();
                }).error(function(data){asy.reject(data);});
                return asy.promise;
            },
            checkEmail: function(email){
                var asy = $q.defer();
                $http.get(property.api.join + "checkEmail/", {params: {_id: email}}).success(function (data){
                    asy.resolve(data);
                }).error(function(data){asy.reject(data);});
                return asy.promise;
            }
        };

        return service;
    }]);