(function () {
  var modulCtrls = angular.module('carros.controllers', []);

  modulCtrls.controller('userController', ['$scope', '$routeParams', 'usuarioService', function ($scope, $routeParams, usuarioService) {
      $scope.fDatos = {action: 'login'};
      $scope.enviar = function () {
        $scope.fDatos = {action: 'guardarUser'};
        usuarioService.conexion($scope.fDatos).then(function (data) {
          console.log(data);
        });
      };
      $scope.login = function () {
        // $scope.fDatos = {action: 'login'};
        usuarioService.conexion($scope.fDatos).then(function (data) {
          var respuesta = (data.data);
          if (respuesta == true) {
            location.href = "#inicio";
            //$location.path( "/inicio" );
          }
        });
      };
    }]);
  modulCtrls.controller('adminController', ['$scope', '$routeParams', 'usuarioService','$window', function ($scope, $routeParams, usuarioService,$window) {
      $scope.ver = "";
      $scope.fDatos={};
      //MOSTRAR LOS DIFERENTES FORMULARIOS
      $scope.mostrar = function (ver) {
        $scope.ver = ver;
      };
      //GUARDAR LOS DATOS 
      
      $scope.guardar = function(){
        console.log($scope.fDatos);
      };
    }]);

  modulCtrls.controller('PokemonController', ['$scope', 'pokemonService', '$routeParams', function ($scope, pokemonService, $routeParams) {

      var name = $routeParams.name;

      $scope.pokemon = {};
      pokemonService.byName(name).then(function (data) {
        $scope.pokemon = data;
      });
    }]);

  modulCtrls.controller('TabsController', function () {
    this.tab = 1;
    this.selectTab = function (tab) {
      this.tab = tab;
    };
  });

})();


