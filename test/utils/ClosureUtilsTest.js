var ClosureUtils = net.riemschneider.utils.ClosureUtils;

TestCase("ClosureUtilsTest", {
  testCountDown: function () {
    var done = false;
    var countDown = ClosureUtils.createCountDown(2, function () { done = true; });
    assertFalse(done);
    countDown();
    assertFalse(done);
    countDown();
    assertTrue(done);
  },

  testCountDownWorksWithZero: function () {
    var done = false;
    ClosureUtils.createCountDown(0, function () { done = true; });
    assertTrue(done);
  },

  testCountDownFailsWhenCalledTooOften: function () {
    var done = false;
    var countDown = ClosureUtils.createCountDown(1, function () { done = true; });
    countDown();
    assertException(function () { countDown(); }, 'RangeError');
  }
});
