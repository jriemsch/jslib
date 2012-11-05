net.riemschneider.utils = net.riemschneider.utils || {};

// Various utility functions for working with closures and callbacks.
(function () {
  net.riemschneider.utils.ClosureUtils = {
    createCountDown: function createCountDown(counter, onZero) {
      if (counter === 0) {
        onZero();
      }

      return function () {
        --counter;
        if (counter === 0) {
          onZero();
        }
        if (counter < 0) {
          throw new RangeError('Too many calls to count down latch');
        }
      };
    },

    safeCallCallback: function safeCallCallback(callback) {
      if (callback) {
        callback();
      }
    }
  };
}());
