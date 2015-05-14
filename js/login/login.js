(function() {
  'use strict';

  angular
    .module('starter')
    .controller('LoginCtrl', LoginCtrl);

  function LoginCtrl(authProvider, $state) {
    var ctrl = this;

    authProvider.me()
      .then(redirect);

    ctrl.login = function(username, password) {
      authProvider
        .login(username, password)
        .then(redirect);
    };

    function redirect() {
      $state.go('game.users');
    }
  }
})();
