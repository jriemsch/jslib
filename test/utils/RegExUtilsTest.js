var RegExUtils = net.riemschneider.utils.RegExUtils;

TestCase("RegExUtilsTest", {
  testFindAllCaptures: function () {
    var results = RegExUtils.findAllCaptures(/<([^>]*)>/g, 'nix <found1> no <found2> nothing');
    assertEquals(2, results.length);
    assertEquals('found1', results[0]);
    assertEquals('found2', results[1]);

    assertEquals(0, RegExUtils.findAllCaptures(/<([^>]*)>/g, 'nix drin'));
  }
});
