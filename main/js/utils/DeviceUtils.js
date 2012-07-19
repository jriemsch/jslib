net.riemschneider.utils = net.riemschneider.utils || {};

// Various utility functions that retrieve device specific data.
(function () {
  var devicePixelRatio = null;

  //noinspection JSUnusedGlobalSymbols
  net.riemschneider.utils.DeviceUtils = {
    getDevicePixelRatio: function getDevicePixelRatio() {
      if (devicePixelRatio === null) {
        devicePixelRatio = 1;
        if (typeof window.devicePixelRatio !== 'undefined') {
          devicePixelRatio = window.devicePixelRatio;
        }
      }

      return devicePixelRatio;
    },

    getScreenSize: function getScreenSize() {
      if (typeof window.orientation === 'undefined') {
        return { width: window.innerWidth, height: window.innerHeight };
      }

      switch (window.orientation) {
        case 0: case 180: return { width: window.innerWidth, height: window.innerHeight };
        case 90: case -90: //noinspection JSSuspiciousNameCombination
        return { width: window.innerHeight, height: window.innerWidth };
      }
    },

    supportTouchEvents: function supportsTouchEvents() {
      return 'ontouchstart' in document.documentElement;
    }
  }
}());
