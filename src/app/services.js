(function() {
  'use strict';

  angular.module('starter.services', ['LocalStorageModule', 'quiz.constants'])
    .factory('$stream', function(socketFactory, ENV) {
      var mySocket = io.connect(`${ENV.HOST}`);

      return socketFactory({
        ioSocket: mySocket
      });
    })

    .service('authProvider', function($q, $http, localStorageService, ENV) {
      var _loggedIn = false,
          _loaded = $q.defer();

      setAuthorizationHeadersFromStore();
      me().finally(_loaded.resolve);

      return {
        register: register,
        login: login,
        me: me,
        logout: logout,
        loggedIn: loggedIn,
        loaded: loaded
      };

      function loaded() {
        return _loaded.promise;
      }

      function login(username, password) {
        setAuthorizationHeaders(username, password);
        return me();
      }

      function me() {
        return $http.get(`${ENV.HOST}/me`)
          .then(loggedIn.bind(this, true));
      }

      function register(username, password) {
        var params = {
          username: username,
          password: password
        };

        logout();
        return $http.post(`${ENV.HOST}/register`, params)
          .then(setAuthorizationHeaders.bind(this, username, password))
          .then(loggedIn.bind(this, true));
      }

      function logout() {
        saveTokenToStore(null);
        loggedIn(false);
      }

      function loggedIn(value) {
        if (value !== undefined)
          _loggedIn = true;

        return _loggedIn;
      }

      function setAuthorizationHeaders(username, password) {
        console.log(arguments);
        if (username && password) {
          var token =  btoa(username + ':' + password);
          $http.defaults.headers.common.Authorization = 'Basic ' + token;
          saveTokenToStore(token);
        }
      }

      function setAuthorizationHeadersFromStore() {
        console.log('token', tokenFromStore());
        if (tokenFromStore())
          $http.defaults.headers.common.Authorization = 'Basic ' + tokenFromStore();
      }

      function saveTokenToStore(token = null) {
        localStorageService.set('authorizationToken', token);
      }

      function tokenFromStore() {
        return localStorageService.get('authorizationToken');
      }
    });
})();
