/**
 * Created by 동준 on 2015-05-21.
 */
app.factory("socketS", ["$rootScope", "$location",
    function($rootScope, $location){
        var socketUrl = $location.host() + ":8002";
        var service = {
            isDisConnect : false,
            socket : '',
            connect : function(jwt){
                service.socket = io.connect(socketUrl, {
                    'query': 'token=' + jwt
                });
                service.socket.on('connect', function(){
                    console.log('connected');
                    /* 다시 접속 */
                    if(service.isDisconnect){
                        $rootScope.$broadcast("reconnect");
                        service.isDisconnect = false;
                    }
                });

                service.socket.on("error", function(error) {
                    console.log(2);
                    console.log(error);
                });

                service.socket.on("disconnect", function(){
                    console.log("disConnect");
                    service.isDisconnect = true;
                });
            },
            disconnect: function() {
                service.socket.disconnect();
            },
            on: function (eventName, callback) {
                function wrapper() {
                    var args = arguments;
                    $rootScope.$apply(function () {
                        callback.apply(service.socket, args);
                    });
                }

                service.socket.on(eventName, wrapper);

                return function () {
                    service.socket.removeListener(eventName, wrapper);
                };
            },

            emit: function (eventName, data, callback) {
                service.socket.emit(eventName, data, function () {
                    var args = arguments;
                    $rootScope.$apply(function () {
                        if(callback) {
                            callback.apply(service.socket, args);
                        }
                    });
                });
            }
        };

        return service;
    }]);