(function() {
  angular
    .module('starter')
    .controller('CurrentCtrl', CurrentCtrl);

  function CurrentCtrl(Game, $stream, $ionicModal, $rootScope, Users) {
    var ctrl = this;

    ctrl.answerId = null;
    ctrl.answer = answer;

    $stream.on('game:winners', showWinners);
    $stream.on('game:question', (current) => {
      hideWinners();
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

    function showWinners(winnersIds) {
      ctrl.showWinners = true;
      ctrl.winners = Users.whereId(winnersIds);
    }

    function hideWinners() {
      ctrl.showWinners = false;
    }
  }
})();
