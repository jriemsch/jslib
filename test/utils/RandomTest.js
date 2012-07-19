var Random = net.riemschneider.utils.Random;

TestCase('RandomTest', {
  testNext: function () {
    Random.setNext([ 0.1, 0.2 ]);
    assertEquals(0.1, Random.next());
    assertEquals(0.2, Random.next());
  }
});