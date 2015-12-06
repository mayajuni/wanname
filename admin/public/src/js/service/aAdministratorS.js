/**
 * Created by mayaj on 2015-10-14.
 */
app.factory('administratorS', ['$q', 'property', '$http', '$uibModal',
    function($q, property, $http, $uibModal){
        var service = {
            getAdministratorList: function(search){
                var asy = $q.defer();
                $http.get(property.api.administrator, {params: search}).success(function (data){
                    asy.resolve(data);
                }).error(function(data){asy.reject(data);});
                return asy.promise;
            },
            addAdministrator: function(Administrator){
                var asy = $q.defer();
                $http.post(property.api.administrator, Administrator).success(function (data){
                    asy.resolve(data);
                }).error(function(data){asy.reject(data);});
                return asy.promise;
            },
            findPassword: function(userId) {
                var asy = $q.defer();
                $http.post(property.api.administrator + 'findPassword', {_id: userId}).success(function (data){
                    asy.resolve(data);
                }).error(function(data){asy.reject(data);});
                return asy.promise;
            },
            deleteAdministrator: function(userId) {
                var asy = $q.defer();
                $http.delete(property.api.administrator, {params: {_id: userId}}).success(function (data){
                    asy.resolve(data);
                }).error(function(data){asy.reject(data);});
                return asy.promise;
            },
            getAdministratorMenu: function(_id) {
                var asy = $q.defer();
                $http.post(property.api.administrator+"getAdministratorMenu", {_id: _id}).success(function (data){
                    asy.resolve(data);
                }).error(function(data){asy.reject(data);});
                return asy.promise;
            },
            checkAdministrator: function(_id) {
                var asy = $q.defer();
                $http.post(property.api.administrator+"checkAdministrator", {_id: _id}).success(function (data){
                    asy.resolve(data);
                }).error(function(data){asy.reject(data);});
                return asy.promise;
            },
            editAdministratorMenu: function(params) {
                var asy = $q.defer();
                $http.post(property.api.administrator+"editAdministratorMenu", params).success(function (data){
                    asy.resolve(data);
                }).error(function(data){asy.reject(data);});
                return asy.promise;
            },
            openAddModal: function() {
                return $uibModal.open({templateUrl: 'view/management/administrator/administratorAdd.md.tpl.html', animation: true, controller: 'administratorAddC', size: 'lg'});
            },
            openAdministratorMenuModal: function(scope) {
                return $uibModal.open({scope: scope, templateUrl: 'view/management/administrator/administratorMenu.md.tpl.html', show: true, controller: 'administratorMenuC', size: 'lg'});
            }
        };

        return service;
    }]);