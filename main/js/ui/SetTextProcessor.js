net.riemschneider.ui = net.riemschneider.ui || {};

// Defines the text of html elements based on the data.
(function () {
  "use strict";

  net.riemschneider.ui.SetTextProcessor = {
    create: function create() {
      return {
        process: function process(clonedElement, data) {
          clonedElement.find('[data-text]').add(clonedElement.filter('[data-text]')).each(function () {
            $(this).contents().first().filter(function () { return this.nodeType === 3; }).remove();
            $(this).prepend(data[$(this).attr('data-text')]);
          });
        }
      };
    }
  };
}());
