net.riemschneider.utils = net.riemschneider.utils || {};

// Various utility functions for working with arrays in JavaScript
(function () {
  net.riemschneider.utils.ArrayUtils = {
    compareNumber: function compareNumber(v1, v2) { return v1 - v2; },

    indexOf: function indexOf(array, elem) {
      for (var idx = 0, end = array.length; idx < end; ++idx) {
        if (array[idx] === elem) {
          return idx;
        }
      }
      return -1;
    },

    removeElementAt: function removeElementAt(array, idx) {
      array.splice(idx, 1);
    },

    removeElement: function removeElement(array, elem) {
      var idx = this.indexOf(array, elem);
      if (idx >= 0) {
        this.removeElementAt(array, idx);
      }
    },

    insertElementAt: function insertElementAt(array, idx, element) {
      array.splice(idx, 0, element);
    },

    binarySearch: function binarySearch(array, element, comparator) {
      var left = 0;
      var right = array.length - 1;
      while (left <= right) {
        if (left === right) {
          if (comparator(array[right], element) < 0) {
            return right + 1;
          }
          return right;
        }
        else {
          var mid = Math.floor((left + right) / 2);
          var result = comparator(array[mid], element);
          if (result === 0) {
            return mid;
          }
          if (result < 0) {
            left = mid + 1;
          }
          else {
            right = mid - 1;
          }
        }
      }
      return left;
    },

    filter: function filter(array, predicate) {
      var filtered = [];
      for (var idx = 0, len = array.length; idx < len; ++idx) {
        var elem = array[idx];
        if (predicate(elem)) {
          filtered.push(elem);
        }
      }
      return filtered;
    },

    some: function some(array, predicate) {
      for (var idx = 0, len = array.length; idx < len; ++idx) {
        if (predicate(array[idx])) {
          return true;
        }
      }
      return false;
    }
  };
}());
