/**
 * Created by mayaj on 2015-09-18.
 */
var rootApi = "/adminApi/";
angular.module('admin')
    .constant('property', {
        api: {
            login: rootApi + 'login/',
            menu: rootApi + 'menu/',
            member: rootApi + 'member/',
            administrator: rootApi + 'administrator/',
            sideMenu: rootApi + 'sideMenu/',
            board: rootApi + 'board/',
            file: rootApi + 'file/',
            teaser: rootApi + 'teaser/'
        }
    });