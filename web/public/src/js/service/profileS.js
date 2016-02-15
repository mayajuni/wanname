/**
 * Created by 동준 on 2015-09-25.
 */
app.factory('profileS', ['$q', 'property', '$http', '$uibModal',
    function($q, property, $http, $uibModal){
        var service = {
            profileEdit : function(params){
                var asy = $q.defer();
                $http.put(property.api.profile, params).success(function(data){
                    asy.resolve(data);
                });
                return asy.promise;
            },
            openEditProfile: function() {
                return $uibModal.open({
                    templateUrl: 'view/myPage/profile/profileEdit.md.html',
                    animation: true,
                    controller: 'profileEditC'
                });
            },
            changePassword: function(password) {
                var asy = $q.defer();
                $http.put(property.api.profile + 'changePassword', password).success(function(data) {
                    asy.resolve(data);
                });
                return asy.promise;
            }
        };

        return service;
    }]);