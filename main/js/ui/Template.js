net.riemschneider.ui = net.riemschneider.ui || {};

// A template for a widget or view that is cloned using a given data set.
(function () {
  "use strict";

  var TypeUtils = net.riemschneider.utils.TypeUtils;
  var ArgumentUtils = net.riemschneider.utils.ArgumentUtils;

  net.riemschneider.ui.Template = {
    create: function create(templateId, processorRegistry) {
      ArgumentUtils.assertString(templateId);
      ArgumentUtils.assertNotNull(processorRegistry);

      var templateDiv = $('[data-template-id="' + templateId + '"]');
      ArgumentUtils.assertRange(templateDiv.length, 1, 1);

      var template = {
        clone: function clone(data) {
          ArgumentUtils.assertNotNull(data);

          var clonedElement = templateDiv.clone();
          clonedElement.removeAttr('data-template-id');

          processorRegistry.call(clonedElement, data);

          if (template.onCloned) {
            template.onCloned(clonedElement, data);
          }

          return clonedElement;
        }
      };
      return template;
    }
  };

  TypeUtils.enhance('net.riemschneider.ui.Template', net.riemschneider.ui.Template);
}());
