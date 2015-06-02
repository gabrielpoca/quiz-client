(function() {
  angular
    .module('starter')
    .service('authProvider', authProvider);

  function authProvider($q, $http, localStorageService, ENV) {
    var _loggedIn = false,
      _loaded = $q.defer(),
      _me = null;

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
      if(_me)
        return $q.when(_me);

      return $http.get(`${ENV.HOST}/me`).then(setLoggedIn);
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

    function setLoggedIn(response) {
      _loggedIn = true;
      _me = response.data;
      return _me;
    }

    function setAuthorizationHeaders(username, password) {
      if (username && password) {
        var token = btoa(username + ':' + password);
        $http.defaults.headers.common.Authorization = 'Basic ' + token;
        saveTokenToStore(token);
      }
    }

    function setAuthorizationHeadersFromStore() {
      if (tokenFromStore())
        $http.defaults.headers.common.Authorization = 'Basic ' + tokenFromStore();
    }

    function saveTokenToStore(token = null) {
      localStorageService.set('authorizationToken', token);
    }

    function tokenFromStore() {
      return localStorageService.get('authorizationToken');
    }
  }
})();
