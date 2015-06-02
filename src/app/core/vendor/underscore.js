(function() {
  angular
    .module('starter')
    .service('_', _);

  function _($window) {
    return $window._;
  }
})();
