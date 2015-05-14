(function() {
  angular
    .module('starter')
    .service('Game', Game);

  function Game($http) {
    return {
      current: current
    };

    function current() {
      return $http.get('http://localhost:3000/questions/current')
        .then(function(response) {
          return response.data;
        });
    }
  }
})();
