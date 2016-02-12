/**
 * Created by mayaj on 2016-01-23.
 */
app.factory('qnaS', ['$q', 'property', '$http', '$uibModal', 'loginS', '$rootScope',
    function($q, property, $http, $uibModal, loginS, $rootScope){
        var service = {
            getQnaList: function(param) {
                var asy = $q.defer();
                $http.get(property.api.qna, {params: param}).success(function (data){
                    asy.resolve(data);
                });
                return asy.promise;
            },
            getQnaDetail: function(_id) {
                var asy = $q.defer();
                $http.get(property.api.qna+_id).success(function (data){
                    asy.resolve(data);
                });
                return asy.promise;
            },
            addQna: function(param) {
                var asy = $q.defer();
                $http.post(property.api.qna, param).success(function (data){
                    asy.resolve(data);
                });
                return asy.promise;
            },
            removeQna: function(_id) {
                var asy = $q.defer();
                $http.delete(property.api.qna+_id).success(function (data){
                    asy.resolve(data);
                });
                return asy.promise;
            },
            openCreateQna: function(scope) {
                if(!$rootScope.user) {
                    return loginS.openLoginModal();
                }

                return $uibModal.open({
                    templateUrl: 'view/myPage/qna/qnaCreate.md.html',
                    animation: true,
                    controller: 'qnaCreateC',
                    scope: scope
                });
            }
        };

        return service;
    }]);