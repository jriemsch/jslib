var TapEventProcessor = net.riemschneider.ui.TapEventProcessor;

TestCase('TapEventProcessorTest', {
  setUp: function () {
    this.processor = TapEventProcessor.create();
  },

  testCreateAndProcessWithParent: function () {
    var div = $('<div id="a" data-tap-event="a">A<div id="b">A</div><div id="c" data-tap-event="c">A</div></div>');
    var data = {
      lastCalled: null,
      a: function () { this.lastCalled = 'A'; },
      b: function () { this.lastCalled = 'B'; },
      c: function () { this.lastCalled = 'C'; }
    };
    this.processor.process(div, data);

    div.trigger(jQuery.Event('mousedown', { pageX: 101, pageY: 101 }));
    div.trigger(jQuery.Event('mouseup', { pageX: 101, pageY: 101 }));
    assertEquals('A', data.lastCalled);

    data.lastCalled = null;
    div.find('#b').trigger(jQuery.Event('mousedown', { pageX: 0, pageY: 0 }));
    div.find('#b').trigger(jQuery.Event('mouseup', { pageX: 0, pageY: 0 }));
    assertEquals('A', data.lastCalled);

    div.find('#c').trigger(jQuery.Event('mousedown', { pageX: 0, pageY: 0 }));
    div.find('#c').trigger(jQuery.Event('mouseup', { pageX: 0, pageY: 0 }));
    assertEquals('C', data.lastCalled);

    assertEquals(0, div.find('[data-tap-event]').length);
    assertUndefined(div.attr('data-tap-event'));
  },

  testCreateAndProcessWithoutParent: function () {
    var div = $('<div id="a">A<div id="b">A</div><div id="c" data-tap-event="c">A</div></div>');
    var data = {
      lastCalled: null,
      a: function () { this.lastCalled = 'A'; },
      b: function () { this.lastCalled = 'B'; },
      c: function () { this.lastCalled = 'C'; }
    };
    this.processor.process(div, data);

    div.trigger(jQuery.Event('mousedown', { pageX: 101, pageY: 101 }));
    div.trigger(jQuery.Event('mouseup', { pageX: 101, pageY: 101 }));
    assertNull(data.lastCalled);

    div.find('#b').trigger(jQuery.Event('mousedown', { pageX: 0, pageY: 0 }));
    div.find('#b').trigger(jQuery.Event('mouseup', { pageX: 0, pageY: 0 }));
    assertNull(data.lastCalled);

    div.find('#c').trigger(jQuery.Event('mousedown', { pageX: 0, pageY: 0 }));
    div.find('#c').trigger(jQuery.Event('mouseup', { pageX: 0, pageY: 0 }));
    assertEquals('C', data.lastCalled);
  }
});
