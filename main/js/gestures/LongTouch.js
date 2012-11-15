net.riemschneider.gestures = net.riemschneider.gestures || {};

(function () {
  var TouchUtils = net.riemschneider.utils.TouchUtils;
  var Clock = net.riemschneider.utils.Clock;

  net.riemschneider.gestures.LongTouch = {
    create: function create(widget, callback, enablePropagation) {
      var touchEndRemover = null;
      var touchMoveRemover = null;
      var timeoutId = null;
      var touchStartRemover = TouchUtils.onTouchStart(widget, function (startEvent) {
        var startTouchPos = TouchUtils.getTouchPosOfEvent(startEvent);
        if (!enablePropagation) {
          startEvent.preventDefault();
          startEvent.stopPropagation();
        }

        timeoutId = Clock.setTimeout(function timeoutHandler() {
          callback();
          startEvent.concurrentCallbackWasCalled = true;
          timeoutId = null;
        }, 1000);

        touchEndRemover = TouchUtils.onTouchEnd(widget, function (event) {
          if (!enablePropagation) {
            event.preventDefault();
            event.stopPropagation();
          }
          cancelLongTouch();
        });

        touchMoveRemover = TouchUtils.onTouchMove(widget, function (event) {
          if (!enablePropagation) {
            event.preventDefault();
            event.stopPropagation();
          }

          var curTouchPos = TouchUtils.getTouchPosOfEvent(event);
          if (Math.abs(curTouchPos.x - startTouchPos.x) > 8 || Math.abs(curTouchPos.y - startTouchPos.y) > 8) {
            cancelLongTouch();
          }
        });
      });

      var cancelLongTouch = function () {
        if (timeoutId) {
          Clock.clearTimeout(timeoutId);
          timeoutId = null;
        }
        if (touchMoveRemover) {
          touchMoveRemover();
          touchMoveRemover = null;
        }
        if (touchEndRemover) {
          touchEndRemover();
          touchEndRemover = null;
        }
      };

      return {
        remove: function remove() {
          touchStartRemover();
          cancelLongTouch();
        }
      };
    }
  };
}());


