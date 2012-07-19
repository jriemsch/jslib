net.riemschneider.utils = net.riemschneider.utils || {};

// Logging support.
(function () {
  var currentDepth = 0;
  var config;

  var levels = {
    DEBUG: { prio: 0, name: 'DEBUG' },
    INFO: { prio: 1, name: 'INFO' },
    WARN: { prio: 2, name: 'WARN' },
    ERROR: { prio: 3, name: 'ERROR' },
    FATAL: { prio: 4, name: 'FATAL' }
  };

  function log(level, message) {
    if (config.level.prio >= level.prio) {
      console.log('[' + level.name + '] ' + message);
    }
  }

  function logWithType(level, type, args) {
    if (config.level.prio >= level.prio) {
      var message = '';
      if (typeof args === 'string') {
        message = args;
      }
      else {
        for (var idx = 0, end = args.length; idx < end; ++idx) {
          if (idx > 0) {
            message += ' ';
          }
          message += args[idx];
        }
      }
      console.log('[' + level.name + '] [' + type + '] ' + message);
    }
  }

  function getWrapperFunc(func, test, type) {
    return function () {
      var funcName = func.toString().substr('function '.length);
      funcName = funcName.substr(0, funcName.indexOf('('));

      var typeId = type && config.fullQualifiedFunctions ? type.getType() + '.' : '';
      var message = typeId + funcName + '(';
      for (var idx = 0, end = arguments.length; idx < end; ++idx) {
        if (idx > 0) {
          message += ', ';
        }
        var argument = arguments[idx];
        if (typeof argument === 'function') {
          argument = '(function)';
        }
        message += argument;
      }
      message += ')';

      if (test) {
        logWithType(levels.DEBUG, type, '');
        logWithType(levels.DEBUG, type, '-------------------------------------------------------');
      }
      logWithType(levels.DEBUG, type, '> ' + message);
      ++currentDepth;
      var result = func.apply(this, arguments);
      --currentDepth;
      var resultMessage = typeId + funcName;
      if (typeof result !== 'undefined') {
        resultMessage += ' -> ' + result;
      }
      logWithType(levels.DEBUG, type, '< ' + resultMessage);
      return result;
    }
  }

  function setConfig(newConfig) {
    config = newConfig;
    net.riemschneider.utils.Log = config.enabled ? enabledLog : disabledLog;
  }

  var enabledLog = {
    setConfig: setConfig,
    levels: levels,

    createLogger: function createLogger(type) {
      function useIfTypeEnabled(func, defaultFunc) {
        return config[type.getType()] ? func : defaultFunc;
      }

      return {
        wrap: useIfTypeEnabled(function wrap(func) { return getWrapperFunc(func, false, type); }, function (func) { return func; }),
        debug: useIfTypeEnabled(function debug() { logWithType(levels.DEBUG, type, arguments); }, function () {}),
        info: useIfTypeEnabled(function info() { logWithType(levels.INFO, type, arguments); }, function () {}),
        warn: useIfTypeEnabled(function warn() { logWithType(levels.WARN, type, arguments); }, function () {}),
        error: useIfTypeEnabled(function error() { logWithType(levels.ERROR, type, arguments); }, function () {}),
        fatal: useIfTypeEnabled(function fatal() { logWithType(levels.FATAL, type, arguments); }, function () {})
      }
    },

    wrapTest: function wrapTest(func) { return getWrapperFunc(func, true); },
    wrap: function wrap(func) { return getWrapperFunc(func, false); },
    log: log
  };

  var disabledLog = {
    setConfig: setConfig,
    levels: levels,

    createLogger: function createLogger() {
      return {
        wrap: function (func) { return func; },
        debug: function () {},
        info: function () {},
        warn: function () {},
        error: function () {},
        fatal: function () {}
      }
    },

    wrapTest: function wrapTest(func) { return func; },
    wrap: function wrap(func) { return func; },
    log: function () {}
  };

  net.riemschneider.utils.Log = enabledLog;
}());
