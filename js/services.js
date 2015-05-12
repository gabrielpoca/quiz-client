(function() {
  'use strict';

  angular.module('starter.services', ['LocalStorageModule'])

    .run(function(Auth, $http) {
      $http.defaults.headers
        .common['Authorization'] = 'Basic ' + Auth.accessToken();
    })

    .factory('$stream', function(socketFactory) {
      var mySocket = io.connect('http://localhost:3000');

      return socketFactory({
        ioSocket: mySocket
      });
    })

    .service('Auth', function($http, localStorageService) {
      return {
        register: register,
        login: login,
        logout: logout,
        accessToken: accessToken
      };

      function accessToken() {
        var username = localStorageService.get('username');
        var password = localStorageService.get('password');

        console.log(username, password);

        return btoa(username + ':' + password);
      }

      function login(username, password) {
        var params = {
          username: username,
          password: password
        };

        return $http.post('http://localhost:3000/me', params)
          .then(saveAuthentication.bind(this, username, password));
      }

      function register(username, password) {
        var params = {
          username: username,
          password: password
        };

        return $http.post('http://localhost:3000/register', params)
          .then(saveAuthentication.bind(this, username, password));
      }

      function logout() {
        saveAuthentication(undefined, undefined);
      }

      function saveAuthentication(username, password) {
        localStorageService.set('username', username);
        localStorageService.set('password', password);
      }
    });
})();
