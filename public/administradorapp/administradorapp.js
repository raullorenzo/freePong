/**
 * Created by carlos on 19/04/2016.
 */
var administradorapp = angular.module('administradorapp', ['ui.router', 'ngTable', 'ngResource', 'ngCookies', 'file-model'])

administradorapp.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('inicio', {
            url: '/',
            templateUrl: 'administrador.html',

        })
        .state('adminusuarios', {
            url: '/adminusuarios',
            templateUrl: 'vistaadminusuarios/vistaadminusuarios.html',
            controller: 'adminusuariosctrl'
        })

        .state('partidas', {
            url: '/partidas/:id',
            templateUrl: 'vistapartidas/vistapartidas.html',
            controller: 'partidasctrl'
        })


        .state('mesas', {
            url: '/mesas',
            templateUrl: 'vistamesas/vistamesas.html',
            controller: 'mesasctrl'
        })
        .state('editar', {
            url: '/editar/:id',
            templateUrl: '../usuarioregistradoapp/vistaeditar/vistaeditar.html',
            controller: 'editarctrl'
        })
        .state('crearmesa', {
            url: '/crearmesa',
            templateUrl: 'vistacrearmesa/vistacrearmesa.html',
            controller: 'crearmesactrl'

        });
    $urlRouterProvider.otherwise('/');
})