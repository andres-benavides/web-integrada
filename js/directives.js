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


