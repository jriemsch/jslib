net.riemschneider.graphics = net.riemschneider.graphics || {};

(function () {
  var TypeUtils = net.riemschneider.utils.TypeUtils;
  var ArgumentUtils = net.riemschneider.utils.ArgumentUtils;

  net.riemschneider.graphics.ImageData = {
    create: function create(imgSrc, imgPos, imgSize) {
      ArgumentUtils.assertString(imgSrc);
      ArgumentUtils.assertType(imgPos, net.riemschneider.graphics.Position);
      ArgumentUtils.assertType(imgSize, net.riemschneider.graphics.Position);

      return {
        getImgSrc: function getImgSrc() { return imgSrc; },
        getImgPos: function getImgPos() { return imgPos; },
        getImgSize: function getImgSize() { return imgSize; }
      };
    }
  };

  TypeUtils.enhance('net.riemschneider.graphics.ImageData', net.riemschneider.graphics.ImageData);
}());
