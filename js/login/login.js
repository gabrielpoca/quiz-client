(function() {
  'use strict';

  angular
    .module('starter')
    .controller('LoginCtrl', LoginCtrl);

  function LoginCtrl(Auth, $state) {
    var ctrl = this;

    ctrl.login = function(username, password) {
      Auth.login(username, password)
        .then(function() {
          $state.go('game.users');
        });
    };
  }
})();
