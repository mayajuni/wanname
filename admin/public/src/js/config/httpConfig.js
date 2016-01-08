/**
 * Created by 동준 on 2015-05-22.
 */
app
    .config(["$httpProvider", function($httpProvider) {
        $httpProvider.interceptors.push("httpConfig");
    }])
    .factory('httpConfig', ['$q', '$rootScope',
        function($q, $rootScope) {
            var numLoadings = 0;
            var notModalUrl = {
                '/adminApi/administrator/checkAdministrator' : true
            };

            return {
                'request': function(config) {
                    if(!notModalUrl[config.url] && config.method != "GET" && config.url.indexOf('/adminApi/file') < 0) {
                        numLoadings++;
                        // Show loader
                        $rootScope.$broadcast("loader_show");
                    }
                    return config || $q.when(config)
                },
                'response': function(response) {
                    if(numLoadings > 0) {
                        if ((--numLoadings) === 0) {
                            // Hide loader
                            $rootScope.$broadcast("loader_hide");
                        }
                    }


                    return response || $q.when(response);
                },
                'responseError': function(response) {
                    if(numLoadings > 0) {
                        if (!(--numLoadings)) {
                            // Hide loader
                            $rootScope.$broadcast("loader_hide");
                        }
                    }

                    if(response.status == 401) {
                        $rootScope.admin = null;
                        alert(response.data);
                        if(response.data.indexOf('로그인') > -1) {
                            location.href="/login";
                        }else {
                            location.href="/";
                        }
                    }else if(response.status != 4019){
                        alert(response.data);
                    }

                    return $q.reject(response);
                }
            }
        }])
;