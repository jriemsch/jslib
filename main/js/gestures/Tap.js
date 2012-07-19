net.riemschneider.gestures = net.riemschneider.gestures || {};

(function () {
  var TouchUtils = net.riemschneider.utils.TouchUtils;

  net.riemschneider.gestures.Tap = {
    create: function create(widget, onTapped, enablePropagation, pressedStyle) {
      var touchEndRemover = null;
      var touchStartRemover = TouchUtils.onTouchStart(widget, function (startEvent) {
        var startTouchPos = TouchUtils.getTouchPosOfEvent(startEvent);
        if (!enablePropagation) {
          startEvent.preventDefault();
          startEvent.stopPropagation();
        }

        if (pressedStyle) {
          widget.addClass(pressedStyle);
        }

        touchEndRemover = TouchUtils.onTouchEnd(widget, function (event) {
          touchEndRemover();
          touchEndRemover = null;
          if (pressedStyle) {
            widget.removeClass(pressedStyle);
          }
          var endTouchPos = TouchUtils.getTouchPosOfEvent(event);
          if (Math.abs(endTouchPos.x - startTouchPos.x) <= 8 && Math.abs(endTouchPos.y - startTouchPos.y) <= 8 &&
              !startEvent.concurrentCallbackWasCalled) {
            if (!enablePropagation) {
              event.preventDefault();
              event.stopPropagation();
            }
            onTapped();
          }
        });
      });

      return {
        remove: function remove() {
          touchStartRemover();
          if (touchEndRemover) {
            touchEndRemover();
          }
        }
      }
    }
  }
}());
