/**
 * Created by mayaj on 2015-10-20.
 */
app.factory('blogS', ['$q', 'property', '$http', '$uibModal',
    function($q, property, $http, $uibModal){
        var service = {
            getBlogList: function(search) {
                var asy = $q.defer();
                $http.get(property.api.blog, {params: search}).success(function (data){
                    asy.resolve(data);
                });
                return asy.promise;
            },
            getBoardDetail: function(_id) {
                var asy = $q.defer();
                $http.get(property.api.blog+_id).success(function (data){
                    asy.resolve(data);
                });
                return asy.promise;
            },
            addBlog: function(param) {
                var asy = $q.defer();
                $http.post(property.api.blog, param).success(function (data){
                    asy.resolve(data);
                });
                return asy.promise;
            },
            removeBlog: function(_id) {
                var asy = $q.defer();
                $http.delete(property.api.blog+_id).success(function (data){
                    asy.resolve(data);
                });
                return asy.promise;
            },
            editBlog: function(params) {
                var asy = $q.defer();
                $http.put(property.api.blog, params).success(function (data){
                    asy.resolve(data);
                });
                return asy.promise;
            },
            openEditModal: function(_id) {
                return $uibModal.open({
                    templateUrl: 'view/blog/blogEdit.md.tpl.html',
                    animation: true,
                    controller: 'blogEditC',
                    size: 'lg',
                    backdrop : 'static',
                    resolve: {
                        detail: function () {
                            return service.getBoardDetail(_id).then(function(data) {
                                return data;
                            });
                        }
                    }
                });
            },
            openCreateModal: function() {
                return $uibModal.open({
                    templateUrl: 'view/blog/blogCreate.md.tpl.html',
                    animation: true,
                    controller: 'blogCreateC',
                    backdrop : 'static',
                    size: 'lg'
                });
            }
        };

        return service;
    }]);