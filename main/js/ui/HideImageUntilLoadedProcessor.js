net.riemschneider.ui = net.riemschneider.ui || {};

// Hides images until they are loaded.
(function () {
  "use strict";

  net.riemschneider.ui.HideImageUntilLoadedProcessor = {
    create: function create() {
      return {
        process: function process(clonedElement) {
          var allImages = clonedElement.find('img').add(clonedElement.filter('img'));
          allImages.hide();
          allImages.load(function onLoaded() { $(this).show(); });
        }
      };
    }
  };
}());
