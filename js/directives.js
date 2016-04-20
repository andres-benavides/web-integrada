(function () {
  var modulDirect = angular.module('carros.directives', []);
  //CREAR UNA DIRECTIVA
  modulDirect.directive('login', function () {
    return {
      restrict: 'E',
      templateUrl: 'partials/login.html'
    };
  });

  modulDirect.directive('registro', function () {
    return {
      restrict: 'E',
      templateUrl: 'partials/registro.html'
    };
  });
  //ADMINISRADOR DE CARROS
  modulDirect.directive('carros', function () {
    return {
      restrict: 'E',
      templateUrl: 'partials/carros.html'
    };
  });
  modulDirect.directive('caracteristica', function () {
    return {
      restrict: 'E',
      templateUrl: 'partials/caracteristica.html'
    };
  });
  modulDirect.directive('tipoCarac', function () {
    return {
      restrict: 'E',
      templateUrl: 'partials/tipo-carac.html'
    };
  });
  modulDirect.directive('asigna', function () {
    return {
      restrict: 'E',
      templateUrl: 'partials/asigna.html'
    };
  });
  //DIRECTIVA PARA SUBIR IMAGENES
  modulDirect.directive("fileinput", ['$parse', '$http',
    function ($parse, $http) {
      return {
        restrict: 'EA',
        template: "<input type='file'/>",
        replace: true,
        link: function (scope, elem, attrs, ctrl) {
          elem.bind('change', function () {
            scope.error = null;
            var f = elem[0].files[0];
            var ok = true;
            if (attrs.size && f.size > (parseInt(attrs.size) * 1048576)) {
              ok = false;
              alert("Error en el tamaño del archivo, supera el tamaño maximo esperado");
            } else {
              if (attrs.ftype) {
                ok = false;
                var tipos = attrs.ftype.split(';');
                for (var i = 0; i < tipos.length; i++) {
                  if (tipos[i] === f.type) {
                    ok = true;
                  }
                }
                if (!ok) {
                  alert("Error en el tipo del archivo, formato de archivo inesperado");
                }
              }
            }
            if(ok){
              if (attrs.action) {
                var formData = new FormData();
                formData.append('archivo', f, f.name);
                $http.post(attrs.action, formData, {
                  transformRequest: angular.identity,
                  headers: {'Content-Type': undefined}
                }).success(function (data) {
                  var model = $parse(attrs.ngModel);
                  model.assign(scope, {code: data.codigo});
                  var nombreModel = attrs.ngModel;
                  nombreModel = nombreModel.replace(/File_/g, "");
                  model = $parse(nombreModel);
                  model.assign(scope, data.codigo);
                  if (attrs.callback) {
                    eval("scope." + attrs.callback);
                  }
                }).error(function () {
                  alert('Error al cargar!');
                });
              }
            } else {
              alert("El archivo no cumple las caracteristicas");
            }
          });
        }
      };
    }
  ]);
  modulDirect.directive('pokemonComments', ['pokemonService', function (pokemonService) {
      return {
        restrict: 'E',
        templateUrl: 'partials/pokemon-comments.html',
        scope: {
          name: '@name'
        },
        link: function (scope, element, attributes) {
          attributes.$observe('name', function (value) {
            if (value) {
              scope.name = value;
              scope.comments = pokemonService.getComments(value);
            }
          });
        },
        controller: function ($scope) {
          $scope.comments = pokemonService.getComments($scope.name);
          $scope.comment = {};
          $scope.show = false;

          $scope.toggle = function () {
            $scope.show = !$scope.show;
          };

          $scope.anonymousChanged = function () {
            if ($scope.comment.anonymous) {
              $scope.comment.email = "";
            }
          };

          $scope.addComment = function () {
            $scope.comment.date = Date.now();
            pokemonService.saveComment($scope.name, $scope.comment);
            $scope.comments = pokemonService.getComments($scope.name);
            $scope.comment = {};
          };

        }
      };
    }]);
})();


