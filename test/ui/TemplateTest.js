var Template = net.riemschneider.ui.Template;
var TemplateProcessorRegistry = net.riemschneider.ui.TemplateProcessorRegistry;
var TypeUtils = net.riemschneider.utils.TypeUtils;

TestCase('TemplateTest', {
  setUp: function () {
    this.div = $('<div class="container" data-template-id="templateId"><div id="child"></div></div>');

    $('body').append(this.div);

    this.processor = {
      lastClonedElem: null,
      lastData: null,
      process: function process(clonedElem, data) { this.lastClonedElem = clonedElem; this.lastData = data; }
    };
    this.processorRegistry = TemplateProcessorRegistry.create();
    this.processorRegistry.addProcessor(this.processor);
  },

  tearDown: function () {
    this.div.remove();
  },

  testCreate: function () {
    var template = Template.create('templateId', this.processorRegistry);
    assertTrue(TypeUtils.isOfType(template, Template));
  },

  testCreateNullAndTypeSafe: function () {
    var processorRegistry = this.processorRegistry;

    assertException(function () { Template.create('templateId', null); });
    assertException(function () { Template.create(null, processorRegistry); });

    assertException(function () { Template.create(123, processorRegistry); });
    assertException(function () { Template.create('other', processorRegistry); });
  },

  testClone: function () {
    var template = Template.create('templateId', this.processorRegistry);
    var data = { image: 'test.png', text: 'testtext', className: 'testclass' };
    var clone = template.clone(data);
    assertTrue(clone.hasClass('container'));
    assertEquals(1, clone.find('#child').length);
    assertUndefined(clone.attr('data-template-id'));

    assertSame(clone, this.processor.lastClonedElem);
    assertSame(data, this.processor.lastData);
  },

  testCloneNullAndTypeSafe: function () {
    var template = Template.create('templateId', this.processorRegistry);
    assertException(function () { template.clone(null); }, 'TypeError');
  },

  testCallsOnCloned: function () {
    var template = Template.create('templateId', this.processorRegistry);
    var lastClonedElem = null;
    var data = { image: 'test.png', text: 'testtext', className: 'testclass' };
    var processor = this.processor;
    template.onCloned = function onCloned(clonedElem, clonedData) {
      assertSame(data, clonedData);
      assertSame(data, processor.lastData);
      assertSame(clonedElem, processor.lastClonedElem);
      lastClonedElem = clonedElem;
    };
    var clone = template.clone(data);
    assertSame(clone, lastClonedElem);
  }
});
