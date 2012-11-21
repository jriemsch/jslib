net.riemschneider.ui = net.riemschneider.ui || {};

// Adds a class to html elements based on the data.
(function () {
  "use strict";

  net.riemschneider.ui.AddClassProcessor = {
    create: function create() {
      return {
        process: function process(clonedElement, data) {
          clonedElement.find('[data-class]').add(clonedElement.filter('[data-class]')).each(function () {
            $(this).addClass(data[$(this).attr('data-class')]);
          });
        }
      };
    }
  };
}());
