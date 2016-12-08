usuarioregistradoapp.controller('vistamesasctrl', ['$stateParams', '$state', '$scope', '$http', 'NgMap',function ($stateParams, $state, $scope, $http, NgMap) {
    var vm = this;
    var IDuser = $stateParams.IDuser;
    var login = $stateParams.login;

    NgMap.getMap().then(function (map) {
        $http.get('/mesa/ObtenerMesas').success(function (data) {
            var mesas = data;
            vm.mesas = mesas;
            console.log(map);
        });
        vm.showCustomMarker = function (event, nombre) {
            console.log(nombre);
            map.customMarkers[nombre].setVisible(true);
            map.customMarkers[nombre].setPosition(this.getPosition());
        };
        vm.closeCustomMarker = function (evt) {
            this.style.display = 'none';
        };
        $scope.horarios = function (mesa) {
            console.log(mesa._id);
            $state.go('crearpartida',
                {
                    IDmesa: mesa._id,
                    IDuser: IDuser,
                    login: login
                });

        }
    });

}]);