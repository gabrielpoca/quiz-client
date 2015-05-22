(function() {
  angular
    .module('starter')
    .controller('CurrentCtrl', CurrentCtrl)
    .controller('WinnersCtrl', WinnersCtrl);

  function WinnersCtrl($rootScope) {
    var ctrl = this;

    ctrl.modal = null;

    ctrl.close = close;

    function close() {
      $rootScope.$broadcast('modal:close');
    }
  }

  function CurrentCtrl(Game, $stream, $ionicModal, $rootScope) {
    var ctrl = this;

    ctrl.answerId = null;
    ctrl.answer = answer;

    $stream.on('game:question', function(current) {
      setQuestion(current);
      $rootScope.$apply();
    });

    $stream.on('game:winners', showWinners);
    $rootScope.$on('modal:close', removeWinnersModal);

    function answer(questionId, answerId) {
      Game.answer(questionId, answerId)
        .then(function() {
          ctrl.answerId = answerId;
        })
        .catch(function() {
          ctrl.answerId = null;
        });
    }

    function setQuestion(question) {
      ctrl.current = question;
      ctrl.answerId = null;
    }

    function showWinners(winners) {
      createWinnersModal().then(function(modal) {
        removeWinnersModal();
        ctrl.modal = modal;
        ctrl.modal.show();
      });
    }

    function createWinnersModal() {
      return $ionicModal.fromTemplateUrl('/app/current/winners_modal.html', {
        animation: 'slide-in-up'
      });
    }

    function removeWinnersModal() {
      if (!ctrl.modal) return;
      ctrl.modal.remove();
      ctrl.modal = null;
    }
  }
})();
