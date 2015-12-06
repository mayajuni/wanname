/**
 * Created by mayaj on 2015-09-25.
 */
app.factory('menuS', ['$rootScope', '$q', '$state', 'property', '$http', '$stateParams', '$location',
    function($rootScope, $q, $state, property, $http, $stateParams, $location){
        var service = {
            getMenu: function(){
                var asy = $q.defer();
                $http.get(property.api.menu).success(function (data){
                    asy.resolve(data);
                });
                return asy.promise;
            },
            saveMenu: function(menu) {
                var asy = $q.defer();
                $http.post(property.api.menu, menu).success(function (){
                    asy.resolve();
                });
                return asy.promise;
            },
            deleteMenu: function(_id, step) {
                var asy = $q.defer();
                $http.delete(property.api.menu, {params: {_id: _id, step: step}}).success(function (){
                    asy.resolve();
                });
                return asy.promise;
            },
            editMenu: function(menu) {
                var asy = $q.defer();
                $http.put(property.api.menu, menu).success(function (){
                    asy.resolve();
                });
                return asy.promise;
            },
            saveRank: function(menus) {
                var asy = $q.defer();
                $http.post(property.api.menu+'editRank', {menus: menus}).success(function (){
                    asy.resolve();
                });
                return asy.promise;
            }
        };

        return service;
    }]);