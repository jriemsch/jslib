var HideImageUntilLoadedProcessor = net.riemschneider.ui.HideImageUntilLoadedProcessor;

TestCase('HideImageUntilLoadedProcessorTest', {
  setUp: function () {
    this.processor = HideImageUntilLoadedProcessor.create();
  },

  testCreateAndProcess: function () {
    var div = $('<div id="a"><img id="b" src=""></div>');
    this.processor.process(div, {});
    assertEquals('none', div.find('#b').css('display'));
    div.find('#b').trigger('load');
    assertEquals('', div.find('#b').css('display'));
  }
});
