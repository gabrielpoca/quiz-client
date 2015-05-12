(function() {
  'use strict';

  angular.module('starter.controllers', [])
    .controller('DashCtrl', function($scope) {})

    .controller('ChatsCtrl', function($scope, $http, $stream) {
      $http({
        method: 'GET',
        url: 'http://localhost:3000/users',
        headers: {
          Authorization: 'Basic ' + btoa('gabrielpoca:password')
        }
      })
        .then(function(users) {
          console.log(users);
        })
        .catch(function(err) {
          console.log(err);
        });

      $stream.on('winners', function(question) {
        console.log(question);
      });

      $stream.emit('ready');
    })

    .controller('ChatDetailCtrl', function($scope, $stateParams) {})

    .controller('AccountCtrl', function() {
    });
})();
