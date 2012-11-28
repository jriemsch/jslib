var SetSrcAttributeProcessor = net.riemschneider.ui.SetSrcAttributeProcessor;

TestCase('SetSrcAttributeProcessorTest', {
  setUp: function () {
    this.processor = SetSrcAttributeProcessor.create();
  },

  testCreateAndProcessWithParent: function () {
    var div = $('<div id="a" data-attr-src="a"><div id="b"></div><div id="c" data-attr-src="c"></div></div>');
    this.processor.process(div, { a: 'A', b: 'B', c: 'C' });
    assertEquals('A', div.attr('src'));
    assertUndefined(div.find('#b').attr('src'));
    assertEquals('C', div.find('#c').attr('src'));
    assertEquals(0, div.find('[data-attr-src]').length);
    assertUndefined(div.attr('data-attr-src'));
  },

  testCreateAndProcessWithoutParent: function () {
    var div = $('<div id="a"><div id="b"></div><div id="c" data-attr-src="c"></div></div>');
    this.processor.process(div, { a: 'A', b: 'B', c: 'C' });
    assertUndefined(div.attr('src'));
    assertUndefined(div.find('#b').attr('src'));
    assertEquals('C', div.find('#c').attr('src'));
  }
});
