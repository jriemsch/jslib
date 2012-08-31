net.riemschneider.utils = net.riemschneider.utils || {};

// Various utility functions for adding and testing type information for an object.
(function () {
  function enhanceMethod(typeObj, method) {
    var original = typeObj[method];
    typeObj[method] = function () {
      var obj = original.apply(this, arguments);
      net.riemschneider.utils.TypeUtils.addType(obj, typeObj);
      return obj;
    };
  }

  net.riemschneider.utils.TypeUtils = {
    addType: function addType(obj, typeObj) {
      if (typeof typeObj.getType != 'function') {
        throw new TypeError('type object without getType function is not allowed');
      }

      obj.types = obj.types || {};
      obj.types[typeObj.getType()] = true;
      return obj;
    },

    isOfType: function isOfType(obj, typeObj) {
      if (typeof typeObj.getType != 'function') {
        throw new TypeError('type object without getType function is not allowed');
      }

      if (typeof obj.types === 'undefined') {
        return false;
      }

      var typeDef = obj.types[typeObj.getType()];
      if (typeof typeDef === 'undefined') {
        return false;
      }

      return typeDef;
    },

    filterByType: function filterByType(array, typeObj) {
      var filtered = [];
      var filteredIdx = 0;
      for (var idx = 0, end = array.length; idx < end; ++idx) {
        var elem = array[idx];
        if (this.isOfType(elem, typeObj)) {
          filtered[filteredIdx] = elem;
          ++filteredIdx;
        }
      }
      return filtered;
    },

    enhance: function enhance(typeId, typeObj) {
      typeObj.getType = function getType() { return typeId; };
      typeObj.toString = function toString() { return typeId; };
      enhanceMethod(typeObj, 'create');
      return typeObj;
    },

    enhanceByMethods: function enhanceByMethods(typeId, methods, typeObj) {
      typeObj.getType = function getType() { return typeId; };
      typeObj.toString = function toString() { return typeId; };
      for (var idx = methods.length - 1; idx >= 0; --idx) {
        enhanceMethod(typeObj, methods[idx]);
      }

      return typeObj;
    },

    enhanceEnum: function enhanceEnum(typeId, typeObj) {
      typeObj.getType = function getType() { return typeId; };
      typeObj.toString = function toString() { return typeId; };
      for (var key in typeObj) {
        if (typeObj.hasOwnProperty(key) && typeof typeObj[key] === 'object') {
          var value = typeObj[key];
          net.riemschneider.utils.TypeUtils.addType(value, typeObj);
        }
      }
      return typeObj;
    }
  };
}());
