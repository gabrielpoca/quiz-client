(function() {
  angular
    .module('starter')
    .controller('CurrentCtrl', CurrentCtrl);

  function CurrentCtrl(Game, $stream, $ionicModal, $rootScope, Users) {
    var ctrl = this;

    ctrl.answerId = null;
    ctrl.answer = answer;

    $stream.on('game:winners', showWinnersModal);
    $stream.on('game:question', function(current) {
      hideWinnersModal();
      setQuestion(current);
      $rootScope.$apply();
    });

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

    function showWinnersModal(winnersIds) {
      ctrl.showWinners = true;
      ctrl.winners = Users.whereId(winnersIds);
    }

    function hideWinnersModal() {
      ctrl.showWinners = false;
    }
  }
})();
