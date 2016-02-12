/**
 * Created by mayaj on 2016-02-02.
 */
app.factory('programS', ['$q', 'property', '$http', '$uibModal',
    function($q, property, $http, $uibModal){
        var service = {
            getProgramList: function() {
                var asy = $q.defer();
                $http.get(property.api.program).success(function(data){
                    asy.resolve(data);
                });
                return asy.promise;
            },
            getProgramDetail: function(_id) {
                var asy = $q.defer();
                $http.get(property.api.program+'detail/'+_id).success(function(data){
                    asy.resolve(data);
                });
                return asy.promise;
            },
            getCategory: function() {
                var asy = $q.defer();
                $http.get(property.api.program+'category').success(function(data){
                    asy.resolve(data);
                });
                return asy.promise;
            },
            apply: function(_id) {
                var asy = $q.defer();
                $http.post(property.api.program+'apply/'+_id).success(function(data){
                    asy.resolve(data);
                });
                return asy.promise;
            },
            like: function(_id) {
                var asy = $q.defer();
                $http.post(property.api.program+'like/'+_id).success(function(data){
                    asy.resolve(data);
                });
                return asy.promise;
            },
            openCourseModal: function(scope) {
                return $uibModal.open({
                    templateUrl: 'view/program/course.md.html',
                    animation: true,
                    scope: scope,
                    controller: 'programCourseC',
                    size: 'lg'
                });
            }
        };

        return service;
    }]);