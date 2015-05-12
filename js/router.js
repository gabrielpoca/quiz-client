(function() {
  'use strict';

  angular
    .module('starter')
    .config(Router);

  function Router($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'app/login/login.html'
      })
      .state('game', {
        url: '/game',
        abstract: true,
        templateUrl: 'app/game/game.html'
      })
      .state('game.users', {
        url: '/users',
        views: {
          'game-users': {
            templateUrl: 'app/users/users.html',
            controller: 'UsersCtrl as ctrl'
          }
        }
      })
      .state('game.question', {
        url: '/question',
        views: {
          'game-question': {
            templateUrl: 'templates/tab-dash.html',
            controller: 'ChatsCtrl'
          }
        }
      })
      .state('game.account', {
        url: '/account',
        views: {
          'game.account': {
            templateUrl: 'templates/tab-account.html',
            controller: 'AccountCtrl'
          }
        }
      });

    $urlRouterProvider.otherwise('/game/users');
  }

})();
