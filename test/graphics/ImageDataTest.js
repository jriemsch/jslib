var ImageData = net.riemschneider.graphics.ImageData;
var Position = net.riemschneider.graphics.Position;
var TypeUtils = net.riemschneider.utils.TypeUtils;

TestCase('ImageDataTest', {
  testCreate: function () {
    var imageData = ImageData.create('src', Position.create(1, 2), Position.create(10, 20));
    assertTrue(TypeUtils.isOfType(imageData, ImageData));
    assertEquals('src', imageData.getImgSrc());
    assertEquals(1, imageData.getImgPos().getX());
    assertEquals(2, imageData.getImgPos().getY());
    assertEquals(10, imageData.getImgSize().getX());
    assertEquals(20, imageData.getImgSize().getY());
  },

  testCreateNullAndTypeSafe: function () {
    var pos = Position.create(1, 2);

    assertException(function () { ImageData.create('src', pos, null); }, 'TypeError');
    assertException(function () { ImageData.create('src', null, pos); }, 'TypeError');
    assertException(function () { ImageData.create(null, pos, pos); }, 'TypeError');

    assertException(function () { ImageData.create('src', pos, 12); }, 'TypeError');
    assertException(function () { ImageData.create('src', 12, pos); }, 'TypeError');
    assertException(function () { ImageData.create(12, pos, pos); }, 'TypeError');
  }
});