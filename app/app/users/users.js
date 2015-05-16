(function() {
  angular
    .module('starter')
    .controller('UsersCtrl', UsersCtrl);

  function UsersCtrl(Users, $stream) {
    var ctrl = this;

    setUsers(Users.all());

    Users.sync()
      .then(setUsers);

    $stream.on('users:update', function(user) {
      Users.sync()
        .then(setUsers);
    });

    function setUsers(users) {
      ctrl.users = users;
    }
  }
})();
