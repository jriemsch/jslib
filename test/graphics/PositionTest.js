var Position = net.riemschneider.graphics.Position;

TestCase('PositionTest', {
  testCreate: function () {
    var pos = Position.create(1, 2, Position.Unit.PIXEL);
    assertEquals(1, pos.getX());
    assertEquals(2, pos.getY());
    assertSame(Position.Unit.PIXEL, pos.getUnit());
  },

  testCreateWithDefaultUnit: function () {
    var pos = Position.create(1, 2);
    assertEquals(1, pos.getX());
    assertEquals(2, pos.getY());
    assertSame(Position.Unit.PIXEL, pos.getUnit());
  },

  testNullAndTypeSafe: function () {
    assertException(function () { Position.create(1, null); }, 'TypeError');
    assertException(function () { Position.create(null, 2); }, 'TypeError');

    assertException(function () { Position.create('1', 2, 'Pixel'); }, 'TypeError');
    assertException(function () { Position.create(1, '2'); }, 'TypeError');
    assertException(function () { Position.create('1', 2); }, 'TypeError');
  }
});