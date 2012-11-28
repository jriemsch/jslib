net.riemschneider.ui = net.riemschneider.ui || {};

// Adds a tapping event handler to html elements based on the given data.
(function () {
  "use strict";

  var Tap = net.riemschneider.gestures.Tap;

  net.riemschneider.ui.TapEventProcessor = {
    create: function create() {
      return {
        process: function process(clonedElement, data) {
          clonedElement.find('[data-tap-event]').add(clonedElement.filter('[data-tap-event]')).each(function () {
            var key = $(this).attr('data-tap-event');
            Tap.create($(this), function() { data[key](); }, false);
            $(this).removeAttr('data-tap-event');
          });
        }
      };
    }
  };
}());
