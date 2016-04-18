(function () {
  var modulFilter = angular.module('pokedex.filters', []);
  
  
  //FILTROS
  modulFilter.filter('imageify',['$filter', function ($filter) {
    return function (input) {
      var url = "img/pokemons/" + $filter('normalize')(input) + ".jpg";
      return url;
    };
  }]);
  
   modulFilter.filter('normalize',  function () {
    return function (input) {
     input = input
                .replace('♂','m')
                .replace('♀','f')
                .replace(/\W+/g,'');
        return input.toLowerCase();
    };
  });
})();


