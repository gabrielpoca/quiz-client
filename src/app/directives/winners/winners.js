(function() {
  angular
    .module('starter')
    .directive('winners', winners);

  function winners() {
    return {
      restrict: 'E',
      replace: true,
      scope: {
        winners: '=',
        open: '='
      },
      controllerAs: 'ctrl',
      controller: function($rootScope, $stream, $scope, $ionicModal, authProvider) {
        var ctrl = this;
        var _me = null;

        // This is returning true/false instead of the current user. API problem?
        authProvider
          .me()
          .then((me) => _me = me);

        // FIXME: for this to work authProvider.me() should return an user.
        $scope.currentUserWon = function() {
          if(!$scope.winners) return false;

          var won = false;
          $scope.winners.forEach((winner) => {
            if(winner.id === _me.id)
              won = true;
          });

          return won;
        };

        $scope.close = function() {
          $scope.open = false;
        };

        $ionicModal.fromTemplateUrl('app/directives/winners/winners.html', {
          animation: 'slide-in-up',
          scope: $scope
        }).then(function(modal) {
          ctrl.modal = modal;

          $scope.$watch('open', (open) => {
            if (open) {
              ctrl.modal.show();
            } else {
              ctrl.modal.hide();
            }
          });
        });

      }
    };
  };
})();
