(function() {
  'use strict';

  angular
    .module('starter')
    .service('Users', Users);

  function Users($http) {
    var _users = [];

    return {
      all: all
    };

    function all(options) {
      options = options || {};

      if (options.sync) {
        $http.get('http://localhost:3000/users')
          .then(console.log);
      }

      return _users;
    }
  }
})();
