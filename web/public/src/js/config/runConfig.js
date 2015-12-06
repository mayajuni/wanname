/**
 * Created by 동준 on 2015-10-02.
 */
app.run(['$rootScope', 'loginS', '$state', function($rootScope, loginS) {
    if(!$rootScope.user){
        loginS.getLoginInfo();
    }

    loginS.autoLogin();
}]);