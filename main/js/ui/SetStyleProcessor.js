net.riemschneider.ui = net.riemschneider.ui || {};

// Sets the css style attributes on html elements based on the data.
(function () {
  "use strict";

  net.riemschneider.ui.SetStyleProcessor = {
    create: function create() {
      return {
        process: function process(clonedElement, data) {
          clonedElement.find('[data-style]').add(clonedElement.filter('[data-style]')).each(function () {
            $(this).css(data[$(this).attr('data-style')]);
            $(this).removeAttr('data-style');
          });
        }
      };
    }
  };
}());
