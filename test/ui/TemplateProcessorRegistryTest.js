var TemplateProcessorRegistry = net.riemschneider.ui.TemplateProcessorRegistry;

TestCase('TemplateProcessorRegistryTest', {
  testAddProcessorAndCall: function () {
    var registry = TemplateProcessorRegistry.create();
    assertNotNull(registry);

    var processor1 = { process: function process(clonedElem, data) { this.clonedElem = clonedElem; this.data = data; } };
    var processor2 = { process: function process(clonedElem, data) { this.clonedElem = clonedElem; this.data = data; } };
    registry.addProcessor(processor1);
    registry.addProcessor(processor2);

    var clonedElem = {};
    var data = {};
    registry.call(clonedElem, data);

    assertSame(clonedElem, processor1.clonedElem);
    assertSame(data, processor1.data);
    assertSame(clonedElem, processor2.clonedElem);
    assertSame(data, processor2.data);
  }
});
