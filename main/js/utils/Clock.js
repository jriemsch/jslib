net.riemschneider.utils = net.riemschneider.utils || {};

// Access to the time that can be mocked for unit tests.
(function () {
  net.riemschneider.utils.Clock = {
    getTime: function getTime() { return new Date().getTime(); },
    setTimeout: function (func, time) { return setTimeout(func, time); },
    clearTimeout: function (timer) { clearTimeout(timer); }
  };
}());
