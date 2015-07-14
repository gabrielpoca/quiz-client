(function() {
  angular
    .module('starter')
    .controller('AccountCtrl', AccountCtrl);

  function AccountCtrl(authProvider, $state) {
    var ctrl = this;
    ctrl.logout = function() {
      authProvider.logout();
      $state.go("login");
    };
  }
})();
