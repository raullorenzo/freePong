/**
 * Created by raul on 5/4/16.
 */

'use strict';
var box = {};

administradorapp.controller('crearmesactrl', ['$state', '$http', '$scope', function ($state, $http, $scope) {
    $scope.demo = function () {
        swal({
            title: "Raul Lorenzo",
            text: "Administrador de FreePong ®",
            imageUrl: "images/perfil_user.png"
        });

    };
    $scope.mesa = {};
    box = $scope.mesa;

    $scope.crearmesa = function () {
        console.log(box);

        //variables para poder trabajar con archivos
        var formData = new FormData();
        var file = $scope.myFile;
        console.log("El fichero es:", file);
        formData.append("file", file);

        $http.post('/mesa/CrearMesa', box).success(function (data) {
            //funcion que actualiza el JSON con la imagen
            $http.put('/mesa/upload/' + box.nombre, formData, {
                    headers: {
                        "Content-type": undefined
                    },
                    transformRequest: angular.identity
                }
                )
                .success(function (data) {
                    $state.go('mesas');
                    swal({
                        title: "Mesa Creada",
                        text: "La mesa se ha creado correctamente",
                        imageUrl: '/images/ok.png'
                    });
                })
                .error(function (data) {
                    console.log('Error: ' + data);
                });

        }).error(function (error) {

            swal({
                title: "Error",
                text: "Error al crear la mesa",
                imageUrl: '/images/error.png'
            });
        })


    };


}]);