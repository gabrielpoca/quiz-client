(function() {
  angular
    .module('starter')
    .controller('UsersCtrl', UsersCtrl);

  function UsersCtrl(Users, $stream) {
    var ctrl = this;
    Users.sync();
    ctrl.users = Users.all;
  }
})();
