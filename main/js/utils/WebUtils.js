net.riemschneider.utils = net.riemschneider.utils || {};

// Various utility functions for accessing web stuff.
(function () {
  var Log = net.riemschneider.utils.Log;
  var TypeUtils = net.riemschneider.utils.TypeUtils;
  var logger;

  net.riemschneider.utils.WebUtils = TypeUtils.enhance('net.riemschneider.utils.WebUtils', {
    getXml: function getXml(url, callback) {
      $.ajax({ url: url, dataType: 'xml', success: callback, error: function (jqXHR, textStatus, errorThrown) {
        logger.error(errorThrown);
        callback(null);
      } });
    },

    getHtml: function getHtml(url, callback) {
      logger.debug('net.riemschneider.utils.WebUtils.getHtml: sending web request to url: ' + url);
      $.ajax({
        url: url,
        dataType: 'text',
        success: function (html) {
          logger.debug('net.riemschneider.utils.WebUtils.getHtml: received web response from url: ' + url);
          callback(html);
        },
        error: function (jqXHR, textStatus, errorThrown) {
          logger.debug('net.riemschneider.utils.WebUtils.getHtml: received error response from url: ' + url);
          logger.error(errorThrown);
          callback(null);
        }
      });
    },

    getImage: function getImage(url, callback) {
      var img = new Image();
      img.onload = function () { callback(img); };
      img.onerror = function () { callback(null); };
      img.src = url;
    }
  });

  logger = Log.createLogger(net.riemschneider.utils.WebUtils);
}());
