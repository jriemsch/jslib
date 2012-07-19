var LongTouch = net.riemschneider.gestures.LongTouch;
var Clock = net.riemschneider.utils.Clock;

TestCase('LongTouchTest', {
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
    this.parent.bind('mousemove', function () {
      test.propagated = true;
    });
    this.parent.bind('mouseup', function () {
      test.propagated = true;
    });
    Clock.setTime(0);
  },

  tearDown: function () {
    this.longTouch.remove();
    this.div.remove();
  },

  testCreateAndLongTouch: function () {
    var called = false;
    this.longTouch = LongTouch.create(this.div, function () { called = true; });

    this.div.trigger(jQuery.Event('mousedown', { pageX: 120, pageY: 110 }));
    Clock.setTime(1000);
    this.div.trigger(jQuery.Event('mouseup', { pageX: 120, pageY: 110 }));

    assertTrue(called);
    assertFalse(this.propagated);
  },

  testCreateAndShortTouch: function () {
    var called = false;
    this.longTouch = LongTouch.create(this.div, function () { called = true; });

    this.div.trigger(jQuery.Event('mousedown', { pageX: 120, pageY: 110 }));
    this.div.trigger(jQuery.Event('mouseup', { pageX: 120, pageY: 110 }));

    assertFalse(called);
    assertFalse(this.propagated);
  },

  testCreateAndLongTouchButMovedTooFar: function () {
    var called = false;
    this.longTouch = LongTouch.create(this.div, function () { called = true; });

    this.div.trigger(jQuery.Event('mousedown', { pageX: 120, pageY: 110 }));
    this.div.trigger(jQuery.Event('mousemove', { pageX: 120, pageY: 120 }));
    Clock.setTime(1000);
    this.div.trigger(jQuery.Event('mouseup', { pageX: 120, pageY: 120 }));

    assertFalse(called);
  },

  testWithEventPropagation: function () {
    this.longTouch = LongTouch.create(this.div, function () {}, true);

    this.div.trigger(jQuery.Event('mousedown', { pageX: 120, pageY: 110 }));
    Clock.setTime(1000);
    this.div.trigger(jQuery.Event('mouseup', { pageX: 120, pageY: 110 }));

    assertTrue(this.propagated);
  },

  testRemove: function () {
    var called = false;
    this.longTouch = LongTouch.create(this.div, function () { called = true; });

    this.div.trigger(jQuery.Event('mousedown', { pageX: 120, pageY: 110 }));
    this.longTouch.remove();
    Clock.setTime(1000);
    this.div.trigger(jQuery.Event('mousemove', { pageX: 120, pageY: 110 }));
    this.div.trigger(jQuery.Event('mouseup', { pageX: 120, pageY: 110 }));
    assertFalse(called);
  }
});

