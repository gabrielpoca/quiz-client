(function() {
  angular
    .module('starter')
    .controller('CurrentCtrl', CurrentCtrl);

  function CurrentCtrl(Game, $stream, $rootScope) {
    var ctrl = this;

    ctrl.answerId = null;

    ctrl.answer = answer;

    Game.current()
      .then(setQuestion);

    $stream.on('game:question', function(current) {
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
  }
})();
