/**
 * Created by raul on 5/4/16.
 */

'use strict';

administradorapp.factory("Mesas", function ($resource, $stateParams) {
    return $resource('/mesa/ObtenerMesasPaginadas'); //la url donde queremos consumir
});

administradorapp.controller('mesasctrl', ['$state', '$http', '$scope', '$location', 'Mesas', '$stateParams', 'ngTableParams', function ($state, $http, $scope, $location, Mesas, $stateParams, ngTableParams) {


    var params;
    var settings;

    params =
    {
        page: 1,
        count: 10
    };
    settings =
    {
        total: 0,
        counts: [5, 10, 25, 50, 100],
        filterDelay: 100,
        getData: function ($defer, params) {
            Mesas.get(params.url(), function (response) {
                params.total(response.total);
                $defer.resolve(response.results);
            });
        }
    };
    $scope.tableParams = new ngTableParams(params, settings);
    $scope.demotableParams = new ngTableParams(params, settings);
    console.log($scope.tableParams);

    $scope.create = function () {
        var Mesa = new Mesas({
            nombre: this.nombre,
            localizacion: this.localizacion

        });

        mesa.$save(function (response) {
            $location.path('customers/' + response._id);

            $scope.nombre = '';
            $scope.localizacion = '';


        }, function (errorResponse) {
            $scope.error = errorResponse.data.message;
        });
    };

    // Remove existing Customer
    $scope.delete = function (id) {
        swal({
                title: "¿Estás Seguro/a?",
                text: "¡Vas a borrar esta mesa de la base de datos!",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55", confirmButtonText: "Sí, borrar!",
                cancelButtonText: "No, cancelar!",
                closeOnConfirm: false,
                closeOnCancel: false
            },
            function (isConfirm) {
                if (isConfirm) {
                    $http.delete('/mesa/EliminarMesaPorID/' + id)
                        .success(function (data) {
                            $scope.newMesa = {};
                            swal("Eliminada", "Mesa eliminada de FreePong", "success");
                            $scope.tableParams.reload();
                        })
                        .error(function (data) {
                            console.log('Error: ' + data);
                        });
                } else {
                    swal("Cancelado", "Has decidido no borrar la mesa", "error");
                }
            });

    };

    // Find a list of Customers
    $scope.find = function () {
        var mesas = {}
        return $http.get('/mesa/ObtenerMesas')
            .success(function (data) {
                $scope.mesas = data;
                console.log(mesas);
            })
    };


    // Update existing Customer
    $scope.update = function () {
        var mesa = $scope.mesa;

        mesa.$update(function () {
            $location.path('/mesas/' + mesa._id);
        }, function (errorResponse) {
            $scope.error = errorResponse.data.message;
        });
    };

    // Find a list of Customers
    // $scope.find = function()
    // {
    //     var mesas = Mesas.get();
    //     console.log(mesas);
    //     $scope.mesas = mesas.results;

    //     //$scope.customers = Customers.query();
    // };


    // Find existing Customer
    $scope.findOne = function () {
        $scope.customer = Mesas.get({
            customerId: $stateParams.customerId
        });
    };


}]);