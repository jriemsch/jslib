net.riemschneider.ui = net.riemschneider.ui || {};

// Registry of processors that are used to manipulate cloned templates.
(function () {
  "use strict";

  var ArgumentUtils = net.riemschneider.utils.ArgumentUtils;

  net.riemschneider.ui.TemplateProcessorRegistry = {
    create: function create() {
      var processors = [];

      return {
        addProcessor: function addProcessor(processor) {
          ArgumentUtils.assertNotNull(processor);
          ArgumentUtils.assertFunction(processor.process);
          processors.push(processor);
        },

        call: function call(clonedElem, data) {
          ArgumentUtils.assertNotNull(clonedElem);
          ArgumentUtils.assertNotNull(data);
          for (var idx = 0, len = processors.length; idx < len; ++idx) {
            processors[idx].process(clonedElem, data);
          }
        }
      };
    }
  };
}());
