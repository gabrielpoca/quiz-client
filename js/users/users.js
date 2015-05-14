(function() {
  angular
    .module('starter')
    .controller('UsersCtrl', UsersCtrl);

  function UsersCtrl(Users) {
    var ctrl = this;

    ctrl.users = Users.all();

    Users.sync()
      .then(function(users) {
        ctrl.users = users;
      });
  }
})();
