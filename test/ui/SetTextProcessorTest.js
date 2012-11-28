var SetTextProcessor = net.riemschneider.ui.SetTextProcessor;

TestCase('SetTextProcessorTest', {
  setUp: function () {
    this.processor = SetTextProcessor.create();
  },

  testCreateAndProcessWithParent: function () {
    var div = $('<div id="a" data-text="a">(oldA)<div id="b">(oldB)</div><div id="c" data-text="c">(oldC)</div>(afterA)</div>');
    this.processor.process(div, { a: '(newA)', b: '(newB)', c: '(newC)' });
    assertEquals('(newA)(oldB)(newC)(afterA)', div.text());
    assertEquals('(oldB)', div.find('#b').text());
    assertEquals('(newC)', div.find('#c').text());
    assertEquals(0, div.find('[data-text]').length);
    assertUndefined(div.attr('data-text'));
  },

  testCreateAndProcessWithoutParent: function () {
    var div = $('<div id="a">(oldA)<div id="b">(oldB)</div><div id="c" data-text="c">(oldC)</div>(afterA)</div>');
    this.processor.process(div, { a: '(newA)', b: '(newB)', c: '(newC)' });
    assertEquals('(oldA)(oldB)(newC)(afterA)', div.text());
    assertEquals('(oldB)', div.find('#b').text());
    assertEquals('(newC)', div.find('#c').text());
  }
});
