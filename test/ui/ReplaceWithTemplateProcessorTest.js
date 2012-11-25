var ReplaceWithTemplateProcessor = net.riemschneider.ui.ReplaceWithTemplateProcessor;
var TemplateProcessorRegistry = net.riemschneider.ui.TemplateProcessorRegistry;
var Template = net.riemschneider.ui.Template;

TestCase('ReplaceWithTemplateProcessorTest', {
  setUp: function () {
    $('body').empty();

    $('body').append($('<div data-template-id="replacement" class="replacement">(replaced)</div>'));

    this.processor = ReplaceWithTemplateProcessor.create();
    this.templateProcessorRegistry = TemplateProcessorRegistry.create();
    this.template = Template.create('replacement', this.templateProcessorRegistry);
  },

  tearDown: function () {
    $('body').empty();
  },

  testCreateAndProcess: function () {
    var template = this.template;
    var div = $('<div id="a"><div id="b"></div><div id="c" class="old" data-replace-with-template="c"></div></div>');
    this.processor.process(div, { a: { template: template }, b: { template: template }, c: { template: template } });
    assertFalse(div.hasClass('replacement'));
    assertFalse(div.find('#b').hasClass('replacement'));
    assertTrue(div.find('#c').hasClass('old'));
    assertTrue(div.find('#c').hasClass('replacement'));
  },

  testCreateAndProcessDoesNotReplaceParent: function () {
    var template = this.template;
    var div = $('<div id="a" data-replace-with-template="a"></div>');
    this.processor.process(div, { a: { template: template } });
    assertFalse(div.hasClass('replacement'));
  }
});
