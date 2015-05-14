(function() {
  angular
    .module('starter')
    .controller('CurrentCtrl', CurrentCtrl);

  function CurrentCtrl(Game) {
    var ctrl = this;

    Game.current()
      .then(function(current) {
        ctrl.current = current;
        console.log(current);
      });
  }
})();
