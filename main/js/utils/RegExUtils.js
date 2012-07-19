net.riemschneider.utils = net.riemschneider.utils || {};

// A few utility functions for dealing with regular expressions.
(function () {
  net.riemschneider.utils.RegExUtils = {
    findAllCaptures: function findAllCaptures(pattern, str) {
      var match = pattern.exec(str);
      var matches = [];
      while (match) {
        matches.push(match[1]);
        match = pattern.exec(str);
      }
      return matches;
    }
  };
}());

