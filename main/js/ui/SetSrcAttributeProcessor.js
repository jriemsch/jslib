net.riemschneider.ui = net.riemschneider.ui || {};

// Defines the src attribute of html elements based on the data.
(function () {
  "use strict";

  net.riemschneider.ui.SetSrcAttributeProcessor = {
    create: function create() {
      return {
        process: function process(clonedElement, data) {
          clonedElement.find('[data-attr-src]').add(clonedElement.filter('[data-attr-src]')).each(function () {
            $(this).attr('src', data[$(this).attr('data-attr-src')]);
          });
        }
      };
    }
  };
}());
