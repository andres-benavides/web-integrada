(function () {
  var modulCtrls = angular.module('carros.controllers', []);

  modulCtrls.controller('userController', ['$scope', 'usuarioService', function ($scope, usuarioService) {
      $scope.fDatos = {action: 'login'};
      $scope.login = function () {
        usuarioService.conexion($scope.fDatos).then(function (data) {
          var respuesta = (data.data);
          if (respuesta == true) {
            location.href = "inicio.php";
            //$location.path( "/inicio" );
          }
        });
      };
    }]);
    modulCtrls.controller('registroController', ['$scope', 'usuarioService', function ($scope, usuarioService) {
        $scope.fDatos = {action: 'guardarUser'};
      $scope.enviar = function () {
        usuarioService.conexion($scope.fDatos).then(function (data) {
          console.log(data);
          if(data.data==""){
            alert("Error la guardar registro\n Verifique si ya registro este correo");
          }else{
             alert("Registro Guardado");
          }
          $scope.fDatos = {action: 'guardarUser'};
        });
      };
    }]);
  modulCtrls.controller('adminController', ['$scope','usuarioService', function ($scope, usuarioService) {
      $scope.ver = "";
      var table;
      var actionx;
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
        table=tabla;
        actionx=action;
        $scope.fDatos={tabla: tabla,action: action};
      };
      //GUARDAR LOS DATOS 
      $scope.guardar = function(){
        usuarioService.admin($scope.fDatos).then(function (data) {
          $scope.fDatos={tabla: table,action: actionx};
          alert("Registro guardado");
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


