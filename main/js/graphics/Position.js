net.riemschneider.graphics = net.riemschneider.graphics || {};

(function () {
  var TypeUtils = net.riemschneider.utils.TypeUtils;
  var ArgumentUtils = net.riemschneider.utils.ArgumentUtils;

  net.riemschneider.graphics.Position = TypeUtils.enhance('net.riemschneider.graphics.Position', {
    create: function create(x, y) {
      ArgumentUtils.assertNumber(x);
      ArgumentUtils.assertNumber(y);

      return {
        getX: function getX() { return x; },
        getY: function getY() { return y; }
      };
    }
  });
}());