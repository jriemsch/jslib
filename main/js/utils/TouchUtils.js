net.riemschneider.utils = net.riemschneider.utils || {};

// Various utility functions for dealing with touch events.
(function () {
  var DeviceUtils = net.riemschneider.utils.DeviceUtils;

  var TOUCH_EVENTS = {
    start: 'touchstart',
    move: 'touchmove',
    end: 'touchend',
    cancel: 'touchcancel'
  };

  var MOUSE_EVENTS = {
    start: 'mousedown',
    move: 'mousemove',
    end: 'mouseup'
  };

  var useTouch = DeviceUtils.supportTouchEvents();
  var events = useTouch ? TOUCH_EVENTS : MOUSE_EVENTS;

  var TouchUtils = {
    getTouchPosOfEvent: function getTouchPosOfEvent(eventOrJQueryEvent) {
      var event = eventOrJQueryEvent.originalEvent || eventOrJQueryEvent;
      if (event.touches && event.touches.length >= 1) {
        return { x: event.touches[0].pageX, y: event.touches[0].pageY };
      }
      if (event.changedTouches && event.changedTouches.length >= 1) {
        return { x: event.changedTouches[0].pageX, y: event.changedTouches[0].pageY };
      }
      return { x: event.pageX, y: event.pageY };
    },

    onTouchEnd: function onTouchEnd(widget, callback) {
      var endRemover = addEventListener(widget, events.end, callback);
      var cancelRemover = events.cancel ? addEventListener(widget, events.cancel, callback) : null;
      return function () {
        endRemover();
        if (cancelRemover) {
          cancelRemover();
        }
      };
    },

    onTouchStart: function onTouchStart(widget, callback) {
      return addEventListener(widget, events.start, callback);
    },

    onTouchMove: function onTouchMove(widget, callback) {
      return addEventListener(widget, events.move, callback);
    }
  };

  function addEventListener(widget, event, callback) {
    widget.bind(event, callback);
    return function () {
      widget.unbind(event, callback);
    };
  }

  net.riemschneider.utils.TouchUtils = TouchUtils;
} ());