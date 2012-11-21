var Template = net.riemschneider.ui.Template;
var TypeUtils = net.riemschneider.utils.TypeUtils;

TestCase('TemplateTest', {
  setUp: function () {
    this.div = $('<div class="container" data-template-id="templateId"></div>');
    this.div.append('<img class="labeledImage" data-id="image" data-attr="src" src="test.png">');
    this.div.append('<div class="labelText" data-id="text" data-attr="text">test</div>');
    this.div.append('<div class="style" data-id="className" data-attr="class">class</div>');

    $('body').append(this.div);
  },

  tearDown: function () {
    this.div.remove();
  },

  testCreate: function () {
    var template = Template.create('templateId');
    assertTrue(TypeUtils.isOfType(template, Template));
  },

  testCreateNullAndTypeSafe: function () {
    assertException(function () { Template.create(null); });

    assertException(function () { Template.create(123); });
    assertException(function () { Template.create('other'); });
  },

  testClone: function () {
    var template = Template.create('templateId');
    var data = { image: 'test.png', text: 'testtext', className: 'testclass' };
    var clone = template.clone(data);
    assertTrue(clone.getClone().hasClass('container'));
    assertTrue(clone.getElement('image').hasClass('labeledImage'));
    assertTrue(clone.getElement('text').hasClass('labelText'));
    assertTrue(clone.getElement('className').hasClass('style'));
    assertTrue(clone.getElement('className').hasClass('testclass'));
    assertUndefined(clone.getClone().attr('data-template-id'));

    var labeledImage = clone.getClone().find('.labeledImage');
    assertEquals(1, labeledImage.length);
    assertEquals('test.png', labeledImage.attr('src'));
    assertEquals('none', labeledImage.css('display'));
    labeledImage.trigger('load');
    assertEquals('', labeledImage.css('display'));

    var labelText = clone.getClone().find('.labelText');
    assertEquals(1, labelText.length);
    assertEquals('testtext', labelText.text());

    var className = clone.getClone().find('.style');
    assertEquals(1, className.length);
    assertEquals('class', className.text());
  },

  testCloneNullAndTypeSafe: function () {
    var template = Template.create('templateId');
    assertException(function () { template.clone(null); }, 'TypeError');
  }
});
