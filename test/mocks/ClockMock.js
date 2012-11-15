net.riemschneider.utils = net.riemschneider.utils || {};

// Mock for the clock used in unit tests.
(function () {
  var ArrayUtils = net.riemschneider.utils.ArrayUtils;

  var time = 0;
  var timeouts = [];
  var timerId = 0;

  net.riemschneider.utils.Clock = {
    reset: function reset() {
      time = 0;
      timeouts = [];
      timerId = 0;
    },
    getTime: function getTime() { return time; },
    setTime: function setTime(newTime) {
      time = newTime;
      var trigger = ArrayUtils.filter(timeouts, function (elem) { return elem.time <= time; });
      for (var idx = trigger.length - 1; idx >= 0; --idx) {
        trigger[idx].callback();
      }
      timeouts = ArrayUtils.filter(timeouts, function (elem) { return elem.time > time; });
    },
    setTimeout: function setTimeout(callback, timeDiff) {
      ++timerId;
      timeouts.push({
        timerId: timerId,
        callback: callback,
        time: time + timeDiff
      });
      return timerId;
    },
    clearTimeout: function clearTimeout(timerId) {
      timeouts = ArrayUtils.filter(timeouts, function (elem) { return elem.timerId !== timerId; });
    }
  };
}());
