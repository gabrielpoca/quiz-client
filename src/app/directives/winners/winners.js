(function() {
  angular
    .module('starter')
    .controller('WinnersCtrl', WinnersCtrl)
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
      controller: 'WinnersCtrl'
    };
  }

  function WinnersCtrl($state, _, $stream, $scope, $ionicModal, authProvider) {
    var ctrl = this;
    var currentUser = null;

    authProvider.me()
      .then((user) => currentUser = user);

    $scope.close = closeModal;
    $scope.currentUserWon = function() {
      return !!_.findWhere($scope.winners, { id: currentUser.id });
    };

    $ionicModal.fromTemplateUrl('app/directives/winners/winners.html', {
      animation: 'slide-in-up',
      scope: $scope
    }).then(initializeModal);

    function initializeModal(modal) {
      ctrl.modal = modal;

      $scope.$watch('open', (open) => {
        if ($state.current.name != 'game.current') return;

        if (open)
          ctrl.modal.show();
        else
          ctrl.modal.hide();
      });
    }

    function closeModal() {
      $scope.open = false;
    }
  }
})();
