net.riemschneider.utils = net.riemschneider.utils || {};

// An observer for a single property of an object.
(function () {
  var ArgumentUtils = net.riemschneider.utils.ArgumentUtils;

  net.riemschneider.utils.ObservedProperty = {
    create: function create(obj, property, observer) {
      ArgumentUtils.assertNotNull(obj);
	  ArgumentUtils.assertString(property);
      ArgumentUtils.assertFunction(observer);
	  
	  var propertyCapitalized = property.charAt(0).toUpperCase() + property.slice(1);
	  var getterName = 'get' + propertyCapitalized;
	  var setterName = 'set' + propertyCapitalized;
	  var getter = obj[getterName];
	  var setter = obj[setterName];
	  ArgumentUtils.assertFunction(getter);
	  ArgumentUtils.assertFunction(setter);
	  
	  obj[setterName] = function observingSetter(value) {
	    if (getter() !== value) {
		  observer(value);
		}
	    setter(value);
	  }
	  
      return {
		destroy: function destroy() { obj[setterName] = setter; }
      };
    }
  };
}());
