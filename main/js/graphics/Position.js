net.riemschneider.graphics = net.riemschneider.graphics || {};

(function () {
  var TypeUtils = net.riemschneider.utils.TypeUtils;
  var ArgumentUtils = net.riemschneider.utils.ArgumentUtils;

  net.riemschneider.graphics.Position = {
    Unit: TypeUtils.enhanceEnum('net.riemschneider.graphics.Position.Unit', {
      PIXEL: { key: 'PIXEL', css: 'px' },
      PERCENT: { key: 'PERCENT', css: '%' }
    }),

    create: function create(x, y, unit) {
      ArgumentUtils.assertNumber(x);
      ArgumentUtils.assertNumber(y);

      unit = unit || net.riemschneider.graphics.Position.Unit.PIXEL;
      ArgumentUtils.assertType(unit, net.riemschneider.graphics.Position.Unit);

      return {
        getX: function getX() { return x; },
        getY: function getY() { return y; },
        getUnit : function getUnit() { return unit; },
        equals: function equals(other) {
          ArgumentUtils.assertType(other, net.riemschneider.graphics.Position);
          return other.getX() === x && other.getY() === y && other.getUnit() === unit;
        }
      };
    }
  };

  TypeUtils.enhance('net.riemschneider.graphics.Position', net.riemschneider.graphics.Position);

  net.riemschneider.graphics.Position.ZERO = net.riemschneider.graphics.Position.create(0, 0);
}());
