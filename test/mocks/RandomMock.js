net.riemschneider.utils = net.riemschneider.utils || {};

// Mock for random values used in unit tests.
(function () {
  var values = [];
  var currentIdx = 0;

  net.riemschneider.utils.Random = {
    next: function next() {
      return values[currentIdx++];
    },

    setNext: function setNext(nextValues) {
      values = nextValues;
      currentIdx = 0;
    }
  }
}());
