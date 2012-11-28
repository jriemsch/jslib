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
            var oldClasses = $(this).attr('class');
            var newClasses = newElement.attr('class');
            if (oldClasses || newClasses) {
              var cssClasses = (oldClasses ? oldClasses + (newClasses ? ' ' + newClasses : '' ) : newClasses);
              newElement.attr('class', cssClasses);
            }
            $(this).replaceWith(newElement);
            newElement.attr('id', id);
          });
        }
      };
    }
  };
}());
