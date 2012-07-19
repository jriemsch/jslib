net.riemschneider.gestures = net.riemschneider.gestures || {};

(function () {
  var TouchUtils = net.riemschneider.utils.TouchUtils;

  net.riemschneider.gestures.Scroll = {
    create: function create(widget, onScrollBy) {
      var touchMoveRemover = null;
      var touchEndRemover = null;
      var touchStartRemover = TouchUtils.onTouchStart(widget, function (startEvent) {
        onScrollBy({ x: 0, y: 0 }, 0);

        startEvent.preventDefault();
        startEvent.stopPropagation();

        var startTouchPos = TouchUtils.getTouchPosOfEvent(startEvent);
        var lastTouchPos = startTouchPos;
        var velocity = { x: 0, y: 0 };

        touchMoveRemover = TouchUtils.onTouchMove(widget, function (moveEvent) {
          moveEvent.preventDefault();
          moveEvent.stopPropagation();

          var curTouchPos = TouchUtils.getTouchPosOfEvent(moveEvent);
          velocity = { x: curTouchPos.x - lastTouchPos.x, y: curTouchPos.y - lastTouchPos.y };
          onScrollBy(velocity, 0);
          lastTouchPos = curTouchPos;
        });

        touchEndRemover = TouchUtils.onTouchEnd(widget, function (endEvent) {
          endEvent.preventDefault();
          endEvent.stopPropagation();

          if (Math.abs(lastTouchPos.x - startTouchPos.x) > 8 || Math.abs(lastTouchPos.y - startTouchPos.y) > 8) {
            var easeTime = Math.max(Math.abs(velocity.x), Math.abs(velocity.y)) * 10;
            var movement = { x: velocity.x * 10, y: velocity.y * 10 };
            onScrollBy(movement, easeTime);
          }

          touchEndRemover();
          touchMoveRemover();
          touchEndRemover = null;
          touchMoveRemover = null;
        });
      });

      return {
        remove: function () {
          touchStartRemover();
          if (touchMoveRemover) {
            touchMoveRemover();
          }
          if (touchEndRemover) {
            touchEndRemover();
          }
        }
      };
    }
  };
}());
