net.riemschneider.utils = net.riemschneider.utils || {};

// Various utility functions for accessing web stuff.
(function () {
  var expectedRequests = {};

  function getExpected(url, callback) {
    var request = expectedRequests[url];
    if (request) {
      callback(request.response);
      if (request.removeIfUsed) {
        delete expectedRequests[url];
      }
    }
    else {
      fail('unexpected request: ' + url);
    }
  }

  net.riemschneider.utils.WebUtils = {
    expectRequest: function expectRequest(url, response, removeIfUsed) {
      expectedRequests[url] = { response: response, removeIfUsed: removeIfUsed };
    },

    getXml: getExpected,
    getJson: getExpected,
    getHtml: getExpected,
    getImage: getExpected
  }
}());
