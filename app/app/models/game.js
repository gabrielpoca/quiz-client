(function() {
  angular
    .module('starter')
    .service('Game', Game);

  function Game($http) {
    return {
      current: current,
      answer: answer
    };

    function current() {
      return $http.get('http://localhost:3000/questions/current')
        .then(function(response) {
          return response.data;
        });
    }

    function answer(questionId, answerId) {
      return $http.post('http://localhost:3000/answers', {
        questionId: questionId,
        answerId: answerId
      });
    }
  }
})();
