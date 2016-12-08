usuarioregistradoapp.controller('vistainsertarresultadosctrl', ['$mdDialog','$stateParams', '$state', '$scope', '$http',function ($mdDialog,$stateParams, $state, $scope, $http) {
    var partidas= new Array();
    var login = $stateParams.login;
    console.log('entro');

    $scope.login=login;
    $http.get('/partida/ObtenerPartidasconestadodos/'+login).success(function (data) {



        partidas=data;
        console.log(partidas);
        $scope.partidas=partidas;
    });
    $scope.insertarresultados= function(p,id,juegoscreador,juegosinvitado){
        console.log(p,id,juegoscreador,juegosinvitado);
        var box = ({juegoscreador: juegoscreador, juegosinvitado: juegosinvitado, horario: p});
        console.log(box);

        $http.put('/partida/insertartarresultados/'+id,box).success(function (data)
        {
            var res='2';
            $scope.resul='1';
            console.log($scope.resul);
            $mdDialog.show({
                controller: DialogController,
                template:'<div><button class="btn btn-medium font-bold"'+
                'socialshare=""'+
                'socialshare-provider="facebook"'+
                'socialshare-type="feed"'+
                'socialshare-via="230153647346505"'+
                'socialshare-media="http://147.83.7.158:3000/images/logo.png"'+
                'socialshare-text="FreePong APP"'+
                'socialshare-caption="'+login+' ha quedado '+juegoscreador+'-'+juegosinvitado+'"'+
                'socialshare-url="http://147.83.7.158:3000/"'+
                'socialshare-popup-height="300"'+
                'socialshare-popup-width="400"'+
                'socialshare-trigger="click">'+
                '<i class="fa fa-facebook">' +
                '</i> Compartir resultado en Facebook'+
                '</button></div>',
                parent: angular.element(document.body),
                clickOutsideToClose:true
            });
            $http.get('/partida/ObtenerPartidasconestadodos/'+login).success(function (data) {
                partidas=data;
                console.log(partidas);
                $scope.partidas=partidas;
            });
        });

    }

    function DialogController($scope, $mdDialog) {
        $scope.hide = function() {
            $mdDialog.hide();
        };
        $scope.cancel = function() {
            $mdDialog.cancel();
        };
        $scope.answer = function(answer) {
            $mdDialog.hide(answer);
        };
    }

}]);