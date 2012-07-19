net.riemschneider.testutils = net.riemschneider.testutils || {};

// Various utility functions for async unit testing.
(function () {
  var caughtException = null;

  net.riemschneider.testutils.AsyncTestUtils = {
    defineAsyncTest: function defineAsyncTest(testQueue, prepareFunc, assertFunc) {
      testQueue.call('', function (testCallbacks) {
        caughtException = null;
        prepareFunc();

        var testCallback = testCallbacks.add(function () {
          if (caughtException) {
            throw caughtException;
          }
          assertFunc();
        });

        var timeoutId = setTimeout(testCallback, 5000);

        function assertState() {
          try {
            assertFunc();
            clearTimeout(timeoutId);
            testCallback();
          }
          catch (e) {
            setTimeout(assertState, 0);
          }
        }

        setTimeout(assertState, 0);
      });
    },

    safeCallback: function safeCallback(callback) {
      return function () {
        try {
          callback.apply(this, arguments);
        }
        catch (e) {
          caughtException = e;
          throw e;
        }
      }
    }
  }
}());
