net.riemschneider.ui = net.riemschneider.ui || {};

// Looks for elements that have a data-replace-with-template attribute and replaces them with clones of the specified
// template.
(function () {
  "use strict";

  net.riemschneider.ui.ReplaceWithTemplateProcessor = {
    create: function create() {
      return {
        process: function process(clonedElement, data) {
          clonedElement.find('[data-replace-with-template]').each(function () {
            var templateData = data[$(this).attr('data-replace-with-template')];
            var newElement = templateData.template.clone(templateData);
            var id = $(this).attr('id');
            var cssClasses = $(this).attr('class') + ' ' + newElement.attr('class');
            $(this).replaceWith(newElement);
            newElement.attr('id', id);
            newElement.attr('class', cssClasses);
          });
        }
      };
    }
  };
}());
