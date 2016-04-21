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
  modulCtrls.controller('adminController', ['$scope','usuarioService', function ($scope, usuarioService) {
      $scope.ver = "";
      $scope.fDatos={};
      //TRAER DATOS PRA RELACIONAR LAS TABLAS
      //TRAER TIPO DE CARACTERISTICA
      $scope.fDatos={tabla: "tipo_caracteristica",action: "consulta"};
      usuarioService.admin($scope.fDatos).then(function (data) {
          $scope.items = data.data;
  
      });
      //TRAER AUTOS
      $scope.fDatos={tabla: "auto",action: "consulta"};
      usuarioService.admin($scope.fDatos).then(function (data) {
          $scope.autos = data.data;
  
      });
      //TRAER caracteristica
      $scope.fDatos={tabla: "caracteristica",action: "consulta"};
      usuarioService.admin($scope.fDatos).then(function (data) {
          $scope.caracteristicas = data.data;
  
      });
      //MOSTRAR LOS DIFERENTES FORMULARIOS
      $scope.mostrar = function (ver,tabla,action) {
        $scope.ver = ver;
        $scope.fDatos={tabla: tabla,action: action};
      };
      //GUARDAR LOS DATOS 
      $scope.guardar = function(){
        usuarioService.admin($scope.fDatos).then(function (data) {
        });
      };

  
      
      //$scope.selectedOption = $scope.options[1];
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


