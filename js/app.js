(function () {
  var app = angular.module('carros', [
    'ngRoute',
    'ngMaterial',
    'carros.controllers',
    'carros.directives',
    'pokedex.filters',
    'carros.services'
  ]);
  
  //Configuracion
  app.config(['$routeProvider',function ($routeProvider){
    $routeProvider
    .when(
      '/',{
        templateUrl:'vista/regisLogi.html',
        controller:'userController'
      }
    )
    .when(
      '/inicio/',{
        templateUrl:'vista/inicio.html',
        controller:'userController'
      }
    )
    .when(
      '/pokemon/:name',{
        templateUrl:'views/pokemon.html',
        controller:'PokemonController',
        controllerAs:'pkmCtrl'
      }
    )
    .otherwise({
      redirectTo:'/'
    });
  }]);


})();
