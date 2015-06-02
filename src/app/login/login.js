(function() {
  'use strict';

  angular
    .module('starter')
    .controller('LoginCtrl', LoginCtrl);

  function LoginCtrl(authProvider, $state, $ionicHistory, $timeout) {
    var ctrl = this;

    ctrl.state = 'login';

    authProvider.me()
      .then(redirect);

    ctrl.login = function(username, password) {
      authProvider
        .login(username, password)
        .then(redirect);
    };

    ctrl.register = function(username, password) {
      authProvider
        .register(username, password)
        .then(redirect);
    };

    function redirect() {
      $ionicHistory.clearCache();
      // clearCache runs inside a timeout, so unless we also
      // wait for the current digest cycle to finish the views won't
      // be cleared until after the change has happened.
      $timeout(function() {
        $state.go('game.users');
      });
    }
  }
})();
