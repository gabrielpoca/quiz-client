(function() {
  'use strict';

  angular
    .module('starter')
    .controller('UsersCtrl', UsersCtrl);

  function UsersCtrl(Users) {
    var ctrl = this;

    Users.all({ sync: true });

    ctrl.users = [
      { name: 'Gabriel', score: 20 },
      { name: 'Ronaldo', score: 30 },
      { name: 'Bruno', score: 40 }
    ];
  }
})();
