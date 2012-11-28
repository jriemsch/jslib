var JQueryTestUtils = net.riemschneider.testutils.JQueryTestUtils;
var InputProcessor = net.riemschneider.ui.TextInputProcessor;

TestCase('TextInputProcessorTest', {
  setUp: function () {
    this.processor = InputProcessor.create();
  },

  tearDown: function () {
    $('body').empty();
  },

  testCreateAndProcess: function () {
    var div = $('<input id="a" type="text" data-text-input="a">');
    var data = { a: 'A' };
    this.processor.process(div, data);

    assertEquals('A', div.val());
    div.val('new');
    assertEquals('new', data.getA());

    assertUndefined(div.attr('data-text-input'));
  },

  testCreateAndProcessWithoutInitialValue: function () {
    var div = $('<input id="a" type="text" data-text-input="a">');
    var data = {};
    this.processor.process(div, data);

    assertEquals('', div.val());
    div.val('new');
    assertEquals('new', data.getA());

    assertUndefined(div.attr('data-text-input'));
  },

  testBlurOnEnter: function () {
    var div = $('<input id="a" type="text" data-text-input="a">');
    this.processor.process(div, {});

    var blurRecorder = JQueryTestUtils.startRecording('blur');
    div.trigger(jQuery.Event('keydown', { which: 13 }));
    JQueryTestUtils.stopRecording(blurRecorder);
    var lastRecording = JQueryTestUtils.getLastRecording(blurRecorder, function () { return true; });
    assertEquals(div[0], lastRecording.obj[0]);
    JQueryTestUtils.clearRecording(blurRecorder);
  },

  testBlurOnClickOutside: function () {
    var div = $('<input id="a" type="text" data-text-input="a">');
    $('body').append(div);
    this.processor.process(div, {});

    var blurRecorder = JQueryTestUtils.startRecording('blur');
    $(document).trigger(jQuery.Event('mousedown', { pageX: 0, pageY: 0 }));
    JQueryTestUtils.stopRecording(blurRecorder);
    var lastRecording = JQueryTestUtils.getLastRecording(blurRecorder, function () { return true; });
    assertEquals(div[0], lastRecording.obj[0]);
    JQueryTestUtils.clearRecording(blurRecorder);
  }
});
