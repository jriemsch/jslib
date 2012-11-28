var Tap = net.riemschneider.gestures.Tap;

TestCase('TapTest', {
  setUp: function () {
    var test = this;

    this.parent = $('<div></div>');
    this.div = $('<div></div>');
    this.div.css({
      position: 'absolute',
      left: 100,
      top: 100,
      width: 200,
      height: 100
    });
    $('body').append(this.parent);
    $(this.parent).append(this.div);

    this.propagated = false;
    this.parent.bind('mousedown', function () {
      test.propagated = true;
    });
    this.parent.bind('mouseup', function () {
      test.propagated = true;
    });
  },

  tearDown: function () {
    this.tap.remove();
    this.div.remove();
  },

  testCreateAndTap: function () {
    var tapped = false;
    this.tap = Tap.create(this.div, function () { tapped = true; });

    this.div.trigger(jQuery.Event('mousedown', { pageX: 120, pageY: 110 }));
    this.div.trigger(jQuery.Event('mouseup', { pageX: 120, pageY: 110 }));

    assertTrue(tapped);
    assertFalse(this.propagated);
  },

  testCreateAndTapButMovedTooFar: function () {
    var tapped = false;
    this.tap = Tap.create(this.div, function () { tapped = true; });

    this.div.trigger(jQuery.Event('mousedown', { pageX: 120, pageY: 110 }));
    this.div.trigger(jQuery.Event('mouseup', { pageX: 120, pageY: 120 }));

    assertFalse(tapped);
  },

  testWithEventPropagation: function () {
    var tapped = false;
    this.tap = Tap.create(this.div, function () { tapped = true; }, true);

    this.div.trigger(jQuery.Event('mousedown', { pageX: 120, pageY: 110 }));
    this.div.trigger(jQuery.Event('mouseup', { pageX: 120, pageY: 110 }));

    assertTrue(this.propagated);
  },

  testStyleChange: function () {
    this.tap = Tap.create(this.div, function () {}, true, 'pressedCustom');

    this.div.trigger(jQuery.Event('mousedown', { pageX: 120, pageY: 110 }));
    assertTrue(this.div.hasClass('pressedCustom'));
    this.div.trigger(jQuery.Event('mouseup', { pageX: 120, pageY: 110 }));
    assertFalse(this.div.hasClass('pressedCustom'));
  },

  testStyleChangeWithDefaultStyle: function () {
    this.tap = Tap.create(this.div, function () {}, true);

    this.div.trigger(jQuery.Event('mousedown', { pageX: 120, pageY: 110 }));
    assertTrue(this.div.hasClass('pressed'));
    this.div.trigger(jQuery.Event('mouseup', { pageX: 120, pageY: 110 }));
    assertFalse(this.div.hasClass('pressed'));
  },

  testRemove: function () {
    var tapped = false;
    this.tap = Tap.create(this.div, function () { tapped = true; });

    this.div.trigger(jQuery.Event('mousedown', { pageX: 120, pageY: 120 }));
    this.tap.remove();
    this.div.trigger(jQuery.Event('mouseup', { pageX: 150, pageY: 150 }));
    assertFalse(tapped);
  }
});
