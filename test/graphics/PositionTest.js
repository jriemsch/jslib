var Position = net.riemschneider.graphics.Position;
var TypeUtils = net.riemschneider.utils.TypeUtils;

TestCase('PositionTest', {
  testCreate: function () {
    var pos = Position.create(1, 2, Position.Unit.PIXEL);
    assertTrue(TypeUtils.isOfType(pos, Position));
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
  },

  testEquals: function () {
    var pos1 = Position.create(1, 2, Position.Unit.PERCENT);
    var pos2 = Position.create(1, 2, Position.Unit.PERCENT);
    var pos3 = Position.create(1, 2, Position.Unit.PIXEL);
    var pos4 = Position.create(1, 1, Position.Unit.PERCENT);
    var pos5 = Position.create(2, 2, Position.Unit.PERCENT);

    assertTrue(pos1.equals(pos1));
    assertTrue(pos1.equals(pos2));

    assertFalse(pos1.equals(pos3));
    assertFalse(pos1.equals(pos4));
    assertFalse(pos1.equals(pos5));
  },

  testZero: function () {
    assertTrue(Position.create(0, 0).equals(Position.ZERO));
  }
});