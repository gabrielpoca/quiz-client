(function() {
  angular
    .module('starter')
    .service('Users', Users);

  function Users($http) {
    var _users = [];

    return {
      all: all,
      sync: sync
    };

    function all(options) {
      return _users;
    }

    function sync() {
      return $http.get('http://localhost:3000/users')
        .then(function(response) {
          _users = response.data;
          return _users;
        });
    }
  }
})();
