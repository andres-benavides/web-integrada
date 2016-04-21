(function () {
  var servicio = angular.module('carros.services', []);

  servicio.factory('usuarioService', ['$http', '$q', function ($http, $q) {
      function conexion(datos) {
        var deferred = $q.defer();
        var req = {
          method: 'POST',
          url: 'index.php',
          headers: {
            'Content-Type': undefined
          },
          data: {datos: datos}
        };
        $http(req)
                .then(function (data) {
                  deferred.resolve(data);
                });
        return deferred.promise;
      }
      function admin(datos) {
        var deferred = $q.defer();
        var req = {
          method: 'POST',
          url: 'controlador/adminController.php',
          headers: {
            'Content-Type': undefined
          },
          data: {datos: datos}
        };
        $http(req)
                .then(function (data) {
                  deferred.resolve(data);
                });
        return deferred.promise;
      }
      return{
        conexion: conexion,
        admin:admin
      };
    }]);
})();

