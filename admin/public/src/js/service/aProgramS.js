/**
 * Created by mayaj on 2016-01-31.
 */
app.factory('programS', ['$q', 'property', '$http', '$uibModal',
    function($q, property, $http, $uibModal){
        var service = {
            getProgramList: function(search) {
                var asy = $q.defer();
                $http.get(property.api.program, {params: search}).success(function (data){
                    asy.resolve(data);
                });
                return asy.promise;
            },
            openCreateModal: function() {
                return $uibModal.open({
                    templateUrl: 'view/program/programCreate.md.tpl.html',
                    animation: true,
                    controller: 'programCreateC',
                    size: 'lg'
                });
            },
            save: function(vo) {
                var asy = $q.defer();
                $http.post(property.api.program, vo).success(function (data){
                    asy.resolve(data);
                });
                return asy.promise;
            },
            detail: function(_id) {
                var asy = $q.defer();
                $http.get(property.api.program + _id).success(function (data){
                    asy.resolve(data);
                });
                return asy.promise;
            },
            openUpdateModal: function(_id) {
                return $uibModal.open({
                    templateUrl: 'view/program/programEdit.md.tpl.html',
                    animation: true,
                    controller: 'programEditC',
                    size: 'lg',
                    resolve: {
                        program: function() {
                            return service.detail(_id).then(function(data) {
                                return data;
                            })
                        }
                    }
                });
            },
            update: function(vo) {
                var asy = $q.defer();
                $http.put(property.api.program, vo).success(function (data){
                    asy.resolve(data);
                });
                return asy.promise;
            }
        };

        return service;
    }]);