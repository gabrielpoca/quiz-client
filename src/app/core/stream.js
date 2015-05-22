(function() {
  angular
    .module('starter')
    .factory('$stream', stream);

  function stream(socketFactory, ENV) {
    var mySocket = io.connect(`${ENV.HOST}`);

    return socketFactory({
      ioSocket: mySocket
    });
  }
})();
