administradorapp.controller('editarctrl', ['$stateParams', '$state', '$http', '$scope', '$location', 'ngTableParams', function ($stateParams, $state, $http, $scope, $location, ngTableParams) {

    $scope.selected = false;
    var id = $stateParams.id;
    console.log(id);
    $http.get('/usuario/ObtenerUsuarioPorID/' + id).success(function (data) {

        $scope.nombre = data.nombre;
        $scope.apellidos = data.apellidos;
        $scope.email = data.email;
        $scope.telefono = data.telefono;
        $scope.login = data.login;
        $scope.password = data.password;
        $scope.saldo = data.saldo;


    });
    $scope.update = function (nombre, apellidos, email, telefono, login, password, saldo) {


        var usuario = {};
        usuario.nombre = nombre;
        usuario.apellidos = apellidos;
        usuario.email = email;
        usuario.telefono = telefono;
        usuario.login = login;
        usuario.password = password;
        usuario.saldo = saldo;

        console.log(usuario);
        $http.put('/usuario/ModificarUsuarioPorID/' + id, usuario)
            .success(function (data) {

                swal({
                    title: "Actualización de Usuario",
                    text: "Usuario " + usuario.nombre + " " + usuario.apellidos + " actualizado correctamente",
                    imageUrl: '/images/ok.png'
                });

                $state.go('admin');
            })
            .error(function (error) {

                swal({
                    title: "Actualización de Usuario",
                    text: "Error al actualizar el usuario" + usuario.nombre + " " + usuario.apellidos + " ",
                    imageUrl: '/images/error.png'
                });

            })
    }
}]);


