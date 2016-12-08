var freepongapp = angular.module('freepongapp', ['ui.router', 'ngTable', 'ngResource', 'ngCookies', 'file-model'])

freepongapp.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('login', {
            url: '/login',
            templateUrl: '../vistas/vistalogin/vistalogin.html',
            controller: 'loginCtrl'
        })
        .state('registro', {
            url: '/registro',
            templateUrl: '../vistas/vistaregistro/vistaregistro.html',
            controller: 'registroctrl'
        });
    $urlRouterProvider.otherwise('login');
});
