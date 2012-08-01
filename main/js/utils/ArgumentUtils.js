net.riemschneider.utils = net.riemschneider.utils || {};

// Various utility functions for working with arguments to functions.
(function () {
  var TypeUtils = net.riemschneider.utils.TypeUtils;

  net.riemschneider.utils.ArgumentUtils = {
    assertNotNull: function assertNotNull(arg) {
      if (typeof arg === 'undefined' || arg === null) {
        throw new TypeError('invalid argument: ' + arg);
      }
    },

    assertUndefined: function assertUndefined(arg) {
      if (typeof arg !== 'undefined') {
        throw new TypeError('argument should be undefined');
      }
    },

    assertTrue: function assertTrue(arg) {
      if (arg !== true) {
        throw new TypeError('argument should be true: ' + arg);
      }
    },

    assertFalse: function assertFalse(arg) {
      if (arg !== false) {
        throw new TypeError('argument should be false: ' + arg);
      }
    },

    assertNumber: function assertNumber(arg) {
      if (typeof arg !== 'number') {
        throw new TypeError('argument should be a number');
      }
    },

    assertMap: function assertMap(arg, elemPredicate) {
      if (arg === null || typeof arg !== 'object' || Object.prototype.toString.apply(arg) === '[object Array]') {
        throw new TypeError('argument should be an object');
      }

      if (elemPredicate) {
        for (var key in arg) {
          elemPredicate(key, arg[key]);
        }
      }
    },

    assertRange: function assertRange(arg, from, to) {
      this.assertNumber(arg);
      if (arg < from || ((typeof to !== 'undefined') && arg > to)) {
        throw new TypeError('argument should be a number between ' + from + ' and ' + to);
      }
    },

    assertString: function assertString(arg) {
      if (typeof arg !== 'string') {
        throw new TypeError('argument should be a string');
      }
    },

    assertArray: function assertArray(arg, elemPredicate) {
      if (Object.prototype.toString.apply(arg) !== '[object Array]') {
        throw new TypeError('argument should be an array: ' + arg);
      }

      if (elemPredicate) {
        for (var idx in arg) {
          elemPredicate(arg[idx]);
        }
      }
    },

    assertType: function assertType(arg, type) {
      this.assertNotNull(arg);
      if (!TypeUtils.isOfType(arg, type)) {
        throw new TypeError('invalid type: ' + arg);
      }
    },

    assertContains: function assertContains(arg, collection) {
      for (var key in collection) {
        if (arg === collection[key]) {
          return;
        }
      }
      throw new TypeError('argument not contained: arg = ' + arg + ', collection = ' + JSON.stringify(collection));
    }
  }
}());
