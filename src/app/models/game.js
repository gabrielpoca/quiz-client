(function() {
  angular
    .module('starter')
    .service('Game', Game);

  function Game($http, ENV) {
    return {
      answer: answer
    };

    function answer(questionId, answerId) {
      return $http.post(`${ENV.HOST}/answers`, {
        questionId: questionId,
        answerId: answerId
      });
    }
  }
})();
