var Position = net.riemschneider.graphics.Position;

TestCase('PositionTest', {
  testCreate: function () {
    var pos = Position.create(1, 2);
    assertEquals(1, pos.getX());
    assertEquals(2, pos.getY());
  },

  testNullAndTypeSafe: function () {
    assertException(function () { Position.create(1, null); }, 'TypeError');
    assertException(function () { Position.create(null, 2); }, 'TypeError');

    assertException(function () { Position.create(1, '2'); }, 'TypeError');
    assertException(function () { Position.create('1', 2); }, 'TypeError');
  }
});