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

      var template = $('[data-template-id="' + templateId + '"]');
      ArgumentUtils.assertRange(template.length, 1, 1);

      return {
        clone: function clone(data) {
          ArgumentUtils.assertNotNull(data);

          var clonedElement = template.clone();
          clonedElement.removeAttr('data-template-id');

          processorRegistry.call(clonedElement, data);

          return clonedElement;
        }
      };
    }
  };

  TypeUtils.enhance('net.riemschneider.ui.Template', net.riemschneider.ui.Template);
}());
