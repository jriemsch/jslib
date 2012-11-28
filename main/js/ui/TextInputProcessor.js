net.riemschneider.ui = net.riemschneider.ui || {};

// Attaches standard input behavior, such as loosing the focus if enter key is pressed or the user taps outside of the
// element. Allows to retrieve new value of input field.
(function () {
  "use strict";

  var TouchUtils = net.riemschneider.utils.TouchUtils;

  net.riemschneider.ui.TextInputProcessor = {
    create: function create() {
      TouchUtils.onTouchStart($(document), function () {
        $(':input').blur();
      });

      return {
        process: function process(clonedElement, data) {
          clonedElement.find('[data-text-input]').add(clonedElement.filter('[data-text-input]')).each(function () {
            var input = $(this);
            var key = input.attr('data-text-input');

            input.keydown(function (event) {
              if (event.which === 13) {
                input.blur();
              }
            });

            if (data[key]) {
              input.val(data[key]);
            }

            var getterName = 'get' + key.charAt(0).toUpperCase() + key.slice(1);
            data[getterName] = function () { return input.val(); };

            $(this).removeAttr('data-text-input');
          });
        }
      };
    }
  };
}());
