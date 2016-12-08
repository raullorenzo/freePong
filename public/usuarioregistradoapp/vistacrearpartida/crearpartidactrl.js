usuarioregistradoapp.controller('crearpartidactrl', [ '$filter','$stateParams', '$state', '$http', '$scope', '$cookies', 'dateFilter', function ($filter,$stateParams, $state, $http, $scope, $cookies, dateFilter) {
    var IDuser = $stateParams.IDuser;
    var IDmesa = $stateParams.IDmesa;
    var login = $stateParams.login;
    var Fecha = {};
    var partida = new Object();

    $scope.mostrarhorarios = false;
    $scope.mostrartitulo = true;


    // GET CURRENT DATE
    var date = new Date();

// GET YYYY, MM AND DD FROM THE DATE OBJECT
    var yyyy = date.getFullYear().toString();
    var mm = (date.getMonth()+1).toString();
    var dd  = date.getDate().toString();

// CONVERT mm AND dd INTO chars
    var mmChars = mm.split('');
    var ddChars = dd.split('');

// CONCAT THE STRINGS IN YYYY-MM-DD FORMAT
    var datestring = yyyy + '-' + (mmChars[1]?mm:"0"+mmChars[0]) + '-' + (ddChars[1]?dd:"0"+ddChars[0]);

    console.log(datestring);
    $scope.minDate= datestring;
    $scope.$watch("date", function (newValue, oldValue) {

        console.log($scope.minDate);
        var fecha = new Date();
        console.log(fecha);
        $scope.date = newValue;
        if(newValue>=fecha){console.log('la fecha es mayor')}
        if (newValue === oldValue) {
            return;
        }
        $http.get('/partida/ObtenerPartidaPorFechaymesa/' + IDmesa + '/' + newValue).success(function (data) {
            $scope.mostrarhorarios = true;
            $scope.mostrartitulo = false;
            console.log(data);
            partida = data[0];
            $scope.partida = partida;
            Fecha = newValue;
        });

    });
    $scope.crearpartida = function (p) {
        $http.get('/partida/ObtenerPartidaPorFechaymesa/' + IDmesa + '/' + Fecha).success(function (data) {
            console.log(data);
            if (data == '') {
                console.log('entro en crear partida');
                var box = 
                ({
                    IDmesa: IDmesa, 
                    FechaPartida: Fecha, 
                    IDcreador: IDuser, 
                    login: login, 
                    horario: p
                });
                $http.post('/partida/CrearPartida', box).success(function (data) {
                    console.log(data);
                    partida = data;
                    $scope.partida = partida;
                });
            }
            else {
                console.log('entro en asignar hora');
                var box1 = 
                ({
                    IDcreador: IDuser, 
                    login: login, 
                    horario: p
                });
                $http.put('/partida/AsignarHoraPartidaporID/' + partida._id, box1).success(function (data) {
                    console.log(data);
                    partida = data;
                    $scope.partida = partida;

                });
            }
        });
    };
    $scope.unirseapartida = function (p) {
        console.log(p);
        var box2 = ({
            IDinvitado: IDuser, 
            login: login, 
            horario: p
        });
        $http.put('/partida/UnirsePartida/' + partida._id, box2).success(function (data) {
            console.log(data);
            partida = data;
            $scope.partida = partida;
        });
    };

}]);

