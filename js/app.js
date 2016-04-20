(function () {
  var app = angular.module('carros', [
    'ngRoute',
    'ui.bootstrap',
    'ngTouch', 
    'ngAnimate', 
    'ngSanitize',
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
      '/admin',{
        templateUrl:'vista/admin.html',
        controller:'adminController'
      }
    )
    .otherwise({
      redirectTo:'/'
    });
  }]);


})();
