net.riemschneider.ui = net.riemschneider.ui || {};

// A template for a widget or view that is cloned using a given data set.
(function () {
  "use strict";

  var TypeUtils = net.riemschneider.utils.TypeUtils;
  var ArgumentUtils = net.riemschneider.utils.ArgumentUtils;

  net.riemschneider.ui.Template = {
    create: function create(templateId) {
      ArgumentUtils.assertString(templateId);

      var template = $('[data-template-id="' + templateId + '"]');
      ArgumentUtils.assertRange(template.length, 1, 1);

      return {
        clone: function clone(data) {
          ArgumentUtils.assertNotNull(data);

          var clonedElement = template.clone();
          clonedElement.removeAttr('data-template-id');
          var elements = {};
          var htmlElements = clonedElement.find('[data-id]');
          for (var idx = 0, len = htmlElements.length; idx < len; ++idx) {
            var elem = $(htmlElements[idx]);
            var key = elem.attr('data-id');
            var attr = elem.attr('data-attr');
            var value = data[key];
            if (attr === 'text') {
              elem.text(value);
            }
            else if (attr === 'class') {
              elem.addClass(value);
            }
            else {
              elem.attr(attr, value);
            }

            elements[key] = elem;
          }

          var allImages = clonedElement.find('img');
          allImages.hide();
          allImages.load(function onLoaded() { $(this).show(); });

          return {
            getClone: function getClone() { return clonedElement; },
            getElement: function getElement(elementId) { return elements[elementId]; }
          };
        }
      };
    }
  };

  TypeUtils.enhance('net.riemschneider.ui.Template', net.riemschneider.ui.Template);
}());
