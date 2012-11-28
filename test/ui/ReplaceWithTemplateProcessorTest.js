var ReplaceWithTemplateProcessor = net.riemschneider.ui.ReplaceWithTemplateProcessor;
var TemplateProcessorRegistry = net.riemschneider.ui.TemplateProcessorRegistry;
var Template = net.riemschneider.ui.Template;

TestCase('ReplaceWithTemplateProcessorTest', {
  setUp: function () {
    $('body').empty();

    $('body').append($('<div data-template-id="replacement" class="replacement">(replaced)</div>'));
    $('body').append($('<div data-template-id="replacementNoClass">(replaced)</div>'));

    this.processor = ReplaceWithTemplateProcessor.create();
    this.templateProcessorRegistry = TemplateProcessorRegistry.create();
    this.template = Template.create('replacement', this.templateProcessorRegistry);
    this.templateNoClass = Template.create('replacementNoClass', this.templateProcessorRegistry);
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
    assertEquals('old replacement', div.find('#c').attr('class'));
    assertEquals(0, div.find('[data-replace-with-template]').length);
    assertUndefined(div.attr('data-replace-with-template'));
  },

  testCreateAndProcessDoesNotReplaceParent: function () {
    var template = this.template;
    var div = $('<div id="a" data-replace-with-template="a"></div>');
    this.processor.process(div, { a: { template: template } });
    assertFalse(div.hasClass('replacement'));
  },

  testCreateAndProcessWithoutClasses: function () {
    var templateNoClass = this.templateNoClass;
    var div = $('<div id="a"><div id="b"></div><div id="c" data-replace-with-template="c"></div></div>');
    this.processor.process(div, { c: { template: templateNoClass } });
    assertUndefined(div.find('#c').attr('class'));
  },

  testCreateAndProcessOldWithoutClasses: function () {
    var template = this.template;
    var div = $('<div id="a"><div id="b"></div><div id="c" data-replace-with-template="c"></div></div>');
    this.processor.process(div, { c: { template: template } });
    assertEquals('replacement', div.find('#c').attr('class'));
  },

  testCreateAndProcessNewWithoutClasses: function () {
    var templateNoClass = this.templateNoClass;
    var div = $('<div id="a"><div id="b"></div><div id="c" class="old" data-replace-with-template="c"></div></div>');
    this.processor.process(div, { c: { template: templateNoClass } });
    assertEquals('old', div.find('#c').attr('class'));
  }
});
