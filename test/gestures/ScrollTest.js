var Scroll = net.riemschneider.gestures.Scroll;

TestCase('ScrollTest', {
  setUp: function () {
    this.div = $('<div></div>');
    this.div.css({
      position: 'absolute',
      left: 100,
      top: 100,
      width: 200,
      height: 100
    });
    $('body').append(this.div);

    var onScrollByCalls = [];
    this.scroll = Scroll.create(this.div, function setScroll(value, easeTime) {
      onScrollByCalls.push({ value: value, easeTime: easeTime });
    });
    this.onScrollByCalls = onScrollByCalls;
  },

  tearDown: function () {
    this.scroll.remove();
    this.div.remove();
  },

  testTouchStartAndEndWithoutMoveDoesNotChangePosition: function () {
    this.div.trigger(jQuery.Event('mousedown', { pageX: 120, pageY: 110 }));
    this.div.trigger(jQuery.Event('mouseup', { pageX: 150, pageY: 100 }));

    assertEquals(1, this.onScrollByCalls.length);
    assertEquals(0, this.onScrollByCalls[0].value.x);
    assertEquals(0, this.onScrollByCalls[0].value.y);
    assertEquals(0, this.onScrollByCalls[0].easeTime);
  },

  testTouchStartAndEndWithMove: function () {
    this.div.trigger(jQuery.Event('mousedown', { pageX: 120, pageY: 110 }));
    this.div.trigger(jQuery.Event('mousemove', { pageX: 150, pageY: 100 }));
    this.div.trigger(jQuery.Event('mouseup', { pageX: 150, pageY: 100 }));

    assertEquals(3, this.onScrollByCalls.length);
    assertEquals(0, this.onScrollByCalls[0].value.x);
    assertEquals(0, this.onScrollByCalls[0].value.y);
    assertEquals(0, this.onScrollByCalls[0].easeTime);

    assertEquals(30, this.onScrollByCalls[1].value.x);
    assertEquals(-10, this.onScrollByCalls[1].value.y);
    assertEquals(0, this.onScrollByCalls[1].easeTime);

    assertEquals(300, this.onScrollByCalls[2].value.x);
    assertEquals(-100, this.onScrollByCalls[2].value.y);
    assertEquals(300, this.onScrollByCalls[2].easeTime);
  },

  testTouchStartAndEndWithMinimalMovement: function () {
    this.div.trigger(jQuery.Event('mousedown', { pageX: 120, pageY: 110 }));
    this.div.trigger(jQuery.Event('mousemove', { pageX: 121, pageY: 111 }));
    this.div.trigger(jQuery.Event('mouseup', { pageX: 121, pageY: 111 }));

    assertEquals(2, this.onScrollByCalls.length);
    assertEquals(0, this.onScrollByCalls[0].value.x);
    assertEquals(0, this.onScrollByCalls[0].value.y);
    assertEquals(0, this.onScrollByCalls[0].easeTime);

    assertEquals(1, this.onScrollByCalls[1].value.x);
    assertEquals(1, this.onScrollByCalls[1].value.y);
    assertEquals(0, this.onScrollByCalls[1].easeTime);
  },

  testMoveAndEndAreNotRecognizedWithoutStart: function () {
    this.div.trigger(jQuery.Event('mousemove', { pageX: 150, pageY: 150 }));
    this.div.trigger(jQuery.Event('mouseup', { pageX: 150, pageY: 150 }));

    assertEquals(0, this.onScrollByCalls.length);
  },

  testMoveAndEndAreNotRecognizedAfterEnd: function () {
    this.div.trigger(jQuery.Event('mousedown', { pageX: 120, pageY: 120 }));
    this.div.trigger(jQuery.Event('mousemove', { pageX: 150, pageY: 150 }));
    this.div.trigger(jQuery.Event('mouseup', { pageX: 150, pageY: 150 }));
    this.div.trigger(jQuery.Event('mousemove', { pageX: 150, pageY: 150 }));
    this.div.trigger(jQuery.Event('mouseup', { pageX: 150, pageY: 150 }));

    assertEquals(3, this.onScrollByCalls.length);
  },

  testRemove: function () {
    this.div.trigger(jQuery.Event('mousedown', { pageX: 120, pageY: 120 }));
    this.scroll.remove();
    this.div.trigger(jQuery.Event('mousemove', { pageX: 150, pageY: 150 }));
    this.div.trigger(jQuery.Event('mouseup', { pageX: 150, pageY: 150 }));
    assertEquals(1, this.onScrollByCalls.length);
  }
});
