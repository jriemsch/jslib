net.riemschneider.testutils = net.riemschneider.testutils || {};

// Various utility functions for unit testing jQuery stuff.
(function () {
  var ArrayUtils = net.riemschneider.utils.ArrayUtils;

  var recorded = {};

  net.riemschneider.testutils.JQueryTestUtils = {
    wrap: function wrap(funcName, newFunc) {
      var original = jQuery.fn[funcName];
      var wrapper = function () {
        var result = newFunc.apply(this, arguments);
        if (result) {
          return result;
        }
        return original.apply(this, arguments);
      };
      wrapper.original = original;
      wrapper.funcName = funcName;
      jQuery.fn[funcName] = wrapper;
      return wrapper;
    },

    unwrap: function unwrap(wrapper) {
      jQuery.fn[wrapper.funcName] = wrapper.original;
    },

    startRecording: function startRecording(funcName) {
      return net.riemschneider.testutils.JQueryTestUtils.wrap(funcName, function () {
        recorded[funcName] = recorded[funcName] || [];
        recorded[funcName].push({ obj: this, args: arguments });
      });
    },

    stopRecording: function stopRecording(recorder) {
      net.riemschneider.testutils.JQueryTestUtils.unwrap(recorder);
    },

    getRecording: function getRecording(recorder) {
      return recorded[recorder.funcName];
    },

    clearRecording: function clearRecording(recorder) {
      recorded[recorder.funcName] = [];
    },

    getLastRecording: function getLastRecording(recorder, matcher) {
      var allRecordings = recorded[recorder.funcName];
      var filtered = ArrayUtils.filter(allRecordings, matcher);
      return filtered.length >= 1 ? filtered[filtered.length - 1] : null;
    },

    matchRecordingByObj: function matchRecordingByObj(obj) {
      return function (recording) {
        return recording.obj[0] === obj[0];
      };
    }
  };
}());