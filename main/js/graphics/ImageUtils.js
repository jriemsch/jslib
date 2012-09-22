net.riemschneider.graphics = net.riemschneider.graphics || {};

// Various utility functions for working with images.
(function () {
  net.riemschneider.graphics.ImageUtils = {
    getPixelFromImage: function getPixelFromImage(img, x, y) {
      var canvas = document.createElement('canvas');
      var context = canvas.getContext('2d');
      context.drawImage(img[0], x, y, 1, 1, 0, 0, 1, 1);
      return context.getImageData(0, 0, 1, 1).data;
    }
  }
}());
