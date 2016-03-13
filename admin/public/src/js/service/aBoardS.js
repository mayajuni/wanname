/**
 * Created by mayaj on 2015-10-20.
 */
/**
 * Created by mayaj on 2015-10-16.
 */
app.factory('boardS', ['$q', 'property', '$http', '$uibModal',
    function($q, property, $http, $uibModal){
        var service = {
            getBoardList: function(category, search) {
                var asy = $q.defer();
                $http.get(property.api.board + category, {params: search}).success(function (data){
                    asy.resolve(data);
                });
                return asy.promise;
            },
            getBoardDetail: function(category, _id) {
                var asy = $q.defer();
                $http.get(property.api.board + category + '/' + _id, {params: {_id: _id}}).success(function (data){
                    asy.resolve(data);
                });
                return asy.promise;
            },
            addBoard: function(board) {
                var asy = $q.defer();
                $http.post(property.api.board + board.category + '/', board).success(function (data){
                    asy.resolve(data);
                });
                return asy.promise;
            },
            editBoard: function(board) {
                var asy = $q.defer();
                $http.put(property.api.board + board.category + '/', board).success(function (data){
                    asy.resolve(data);
                });
                return asy.promise;
            },
            removeBoard: function(category, _id) {
                var asy = $q.defer();
                $http.delete(property.api.board + category + '/' + _id).success(function (data){
                    asy.resolve(data);
                });
                return asy.promise;
            },
            openEditModal: function(category, _id) {
                return $uibModal.open({
                    templateUrl: 'view/serviceCenter/'+category+'/'+category+'Edit.md.tpl.html',
                    animation: true,
                    backdrop : 'static',
                    controller: 'boardEditC',
                    size: 'lg',
                    resolve: {
                        detail: function () {
                            return service.getBoardDetail(category, _id).then(function(data) {
                                return data;
                            });
                        }
                    }
                });
            },
            openCreateModal: function(scope) {
                return $uibModal.open({
                    scope: scope,
                    templateUrl: 'view/serviceCenter/'+scope.category+'/'+scope.category+'Create.md.tpl.html',
                    animation: true,
                    backdrop : 'static',
                    controller: 'boardCreateC',
                    size: 'lg'
                });
            }
        };

        return service;
    }]);