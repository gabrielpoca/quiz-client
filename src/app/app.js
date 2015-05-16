(function() {
  'use strict';

  angular.module('starter', [
    'ionic',
    'starter.services',
    'btford.socket-io'
  ])

  .run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
      if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      }
      if (window.StatusBar) {
        StatusBar.styleLightContent();
      }
    });
  });
})();