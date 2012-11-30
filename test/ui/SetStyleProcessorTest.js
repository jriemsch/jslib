var SetStyleProcessor = net.riemschneider.ui.SetStyleProcessor;

TestCase('SetStyleProcessorTest', {
  setUp: function () {
    this.processor = SetStyleProcessor.create();
  },

  testCreateAndProcessWithParent: function () {
    var div = $('<div id="a" data-style="a"><div id="b"></div><div id="c" data-style="c"></div></div>');
    this.processor.process(div, { a: { left: '10px' }, b: { left: '20px' }, c: { left: '30px' } });
    assertEquals('10px', div.css('left'));
    assertEquals('', div.find('#b').css('left'));
    assertEquals('30px', div.find('#c').css('left'));
    assertEquals(0, div.find('[data-style]').length);
    assertUndefined(div.attr('data-style'));
  },

  testCreateAndProcessWithoutParent: function () {
    var div = $('<div id="a"><div id="b"></div><div id="c" data-style="c"></div></div>');
    this.processor.process(div, { a: { left: '10px' }, b: { left: '20px' }, c: { left: '30px' } });
    assertEquals('', div.css('left'));
    assertEquals('', div.find('#b').css('left'));
    assertEquals('30px', div.find('#c').css('left'));
  }
});
