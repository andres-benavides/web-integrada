(function () {
    var modulCtrls = angular.module('carros.controllers', []);

    modulCtrls.controller('autoController', ['$scope', 'usuarioService', function ($scope, usuarioService) {
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
            $scope.fDatos = {action: 'guardarauto'};
            $scope.enviar = function () {
                usuarioService.conexion($scope.fDatos).then(function (data) {
                    console.log(data);
                    if (data.data == "") {
                        alert("Error la guardar registro\n Verifique si ya registro este correo");
                    } else {
                        alert("Registro Guardado");
                    }
                    $scope.fDatos = {action: 'guardarauto'};
                });
            };
        }]);
    modulCtrls.controller('adminController', ['$scope', 'usuarioService', function ($scope, usuarioService) {
            $scope.ver = "";
            var table;
            var actionx;
            $scope.fDatos = {};
            //TRAER DATOS PRA RELACIONAR LAS TABLAS
            //TRAER TIPO DE CARACTERISTICA
            $scope.fDatos = {tabla: "tipo_caracteristica", action: "consulta"};
            usuarioService.admin($scope.fDatos).then(function (data) {
                $scope.items = data.data;

            });
            //TRAER AUTOS
            $scope.fDatos = {tabla: "auto", action: "consulta"};
            usuarioService.admin($scope.fDatos).then(function (data) {
                $scope.autos = data.data;

            });
            //TRAER caracteristica
            $scope.fDatos = {tabla: "caracteristica", action: "consulta"};
            usuarioService.admin($scope.fDatos).then(function (data) {
                $scope.caracteristicas = data.data;

            });
            //MOSTRAR LOS DIFERENTES FORMULARIOS
            $scope.mostrar = function (ver, tabla, action) {
                $scope.ver = ver;
                table = tabla;
                actionx = action;
                $scope.fDatos = {tabla: tabla, action: action};
            };
            //GUARDAR LOS DATOS 
            $scope.guardar = function () {
                usuarioService.admin($scope.fDatos).then(function (data) {
                    $scope.fDatos = {tabla: table, action: actionx};
                    alert("Registro guardado");
                });
            };

            $scope.showGroup = function (auto) {
                if (auto.group && $scope.groups.length) {
                    var selected = $filter('filter')($scope.groups, {id: auto.group});
                    return selected.length ? selected[0].text : 'Not set';
                } else {
                    return auto.groupName || 'Not set';
                }
            };

            $scope.showStatus = function (auto) {
                var selected = [];
                if (auto.status) {
                    selected = $filter('filter')($scope.statuses, {value: auto.status});
                }
                return selected.length ? selected[0].text : 'Not set';
            };

            $scope.checkName = function (data, id) {
                if (id === 2 && data !== 'awesome') {
                    return "autoname 2 should be `awesome`";
                }
            };

            $scope.saveAuto = function (data, id) {
                //$scope.auto not updated yet
                angular.extend(data, {id: id});
                return $http.post('/saveauto', data);
            };

            // remove auto
            $scope.removeAuto = function (index) {
                $scope.autos.splice(index, 1);
            };

            // add auto
            $scope.addAuto = function () {
                $scope.inserted = {
                    id: $scope.autos.length + 1,
                    name: '',
                    status: null,
                    group: null
                };
                $scope.autos.push($scope.inserted);
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


