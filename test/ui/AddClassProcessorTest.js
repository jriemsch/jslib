var AddClassProcessor = net.riemschneider.ui.AddClassProcessor;

TestCase('AddClassProcessorTest', {
  setUp: function () {
    this.processor = AddClassProcessor.create();
  },

  testCreateAndProcessWithParent: function () {
    var div = $('<div id="a" data-class="a"><div id="b"></div><div id="c" data-class="c"></div></div>');
    this.processor.process(div, { a: 'A', b: 'B', c: 'C' });
    assertTrue(div.hasClass('A'));
    assertFalse(div.find('#b').hasClass('B'));
    assertTrue(div.find('#c').hasClass('C'));
    assertEquals(0, div.find('[data-class]').length);
    assertUndefined(div.attr('data-class'));
  },

  testCreateAndProcessWithoutParent: function () {
    var div = $('<div id="a"><div id="b"></div><div id="c" data-class="c"></div></div>');
    this.processor.process(div, { a: 'A', b: 'B', c: 'C' });
    assertFalse(div.hasClass('A'));
    assertFalse(div.find('#b').hasClass('B'));
    assertTrue(div.find('#c').hasClass('C'));
  }
});
