net.riemschneider.utils = net.riemschneider.utils || {};

// Access to the random values that can be mocked for unit tests.
(function () {
  net.riemschneider.utils.Random = {
    next: function next() { return Math.random(); }
  };
}());
