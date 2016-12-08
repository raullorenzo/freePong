'use strict';
var box = {};

freepongApp.controller('addCtrl', ['$state', '$http', '$scope', 'FlashService', function ($state, $http, $scope, FlashService) {

    $scope.demo = function () {
        swal({
            title: "Raul Lorenzo",
            text: "Administrador de FreePong ®",
            imageUrl: "images/perfil_user.png"
        });

    };

    $scope.usuario = {};
    box = $scope.usuario;
    $scope.registro = function () {
        console.log(box);
        $http.post('/usuario/CrearUsuario', box).success(function (data) {
            FlashService.Success('Registro correcto', true);
            $state.go('admin');
            swal({
                title: "Usuario Creado",
                text: "El usuario " + box.nombre + " " + box.apellidos + " se ha creado correctamente",
                imageUrl: '/images/ok.png'
            });

        }).error(function (error) {
            FlashService.Error('Username ya existente, introduzca otro', true);
            swal({
                title: "Error",
                text: "Error al crear el usuario" + box.nombre + " " + box.apellidos + " ",
                imageUrl: '/images/error.png'
            });
        })
    };

}]);
