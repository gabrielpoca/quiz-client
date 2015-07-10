(function() {
  angular
    .module('starter')
    .controller('UsersCtrl', UsersCtrl);

  function UsersCtrl(Users) {
    var ctrl = this;
    Users.sync();
    ctrl.users = Users.all;
  }
})();
