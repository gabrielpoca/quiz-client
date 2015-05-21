(function() {
  angular
    .module('starter')
    .service('Users', Users);

  function Users($http, ENV) {
    var _users = [];

    return {
      all: all,
      sync: sync
    };

    function all(options) {
      return _users;
    }

    function sync() {
      return $http.get(`${ENV.HOST}/users`)
        .then(function(response) {
          _users = response.data;
          return _users;
        });
    }
  }
})();
