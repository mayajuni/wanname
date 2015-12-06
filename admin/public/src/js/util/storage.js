/**
 * Created by 동준 on 2015-08-01.
 */
app
    /* 로컬 스토리지 */
    .factory('$localStorage', ['$window', function($window) {
        return {
            set: function(key, value) {
                $window.localStorage[key] = value;
            },
            get: function(key, defaultValue) {
                return $window.localStorage[key] || defaultValue;
            },
            setObject: function(key, value) {
                $window.localStorage[key] = JSON.stringify(value);
            },
            getObject: function(key) {
                return JSON.parse($window.localStorage[key] || '{}');
            },
            remove : function(key){
                delete $window.localStorage[key];
            },
            clear : function(){
                $window.localStorage.clear();
            }
        }
    }])
    /* 세션 스토리지 */
    .factory('$sessionStorage', ['$window', function($window) {
        return {
            set: function(key, value) {
                $window.sessionStorage[key] = value;
            },
            get: function(key, defaultValue) {
                return $window.sessionStorage[key] || defaultValue;
            },
            setObject: function(key, value) {
                $window.sessionStorage[key] = JSON.stringify(value);
            },
            getObject: function(key) {
                return JSON.parse($window.sessionStorage[key] || '{}');
            },
            remove : function(key){
                delete $window.sessionStorage[key];
            },
            clear : function(){
                $window.sessionStorage.clear();
            }
        }
    }])
;