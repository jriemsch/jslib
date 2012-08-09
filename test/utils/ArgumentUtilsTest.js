var TypeUtils = net.riemschneider.utils.TypeUtils;
var ArgumentUtils = net.riemschneider.utils.ArgumentUtils;

TestCase("ArgumentUtilsTest", {
  testAssertNotNull: function () {
    ArgumentUtils.assertNotNull({});
    ArgumentUtils.assertNotNull("true");
    ArgumentUtils.assertNotNull("false");
    ArgumentUtils.assertNotNull(0);
    ArgumentUtils.assertNotNull(1);
    ArgumentUtils.assertNotNull(true);
    ArgumentUtils.assertNotNull(false);

    var a = {};
    assertException(function () { ArgumentUtils.assertNotNull(null); }, "TypeError");
    assertException(function () { ArgumentUtils.assertNotNull(a.b); }, "TypeError");
  },

  testAssertUndefined: function () {
    var a = {};
    ArgumentUtils.assertUndefined(a.b);
    ArgumentUtils.assertUndefined();

    assertException(function () { ArgumentUtils.assertUndefined(null); }, "TypeError");
    assertException(function () { ArgumentUtils.assertUndefined("false"); }, "TypeError");
    assertException(function () { ArgumentUtils.assertUndefined("true"); }, "TypeError");
    assertException(function () { ArgumentUtils.assertUndefined(0); }, "TypeError");
    assertException(function () { ArgumentUtils.assertUndefined(1); }, "TypeError");
    assertException(function () { ArgumentUtils.assertUndefined(false); }, "TypeError");
    assertException(function () { ArgumentUtils.assertUndefined(true); }, "TypeError");
  },

  testAssertTrue: function () {
    ArgumentUtils.assertTrue(true);

    assertException(function () { ArgumentUtils.assertTrue(null); }, "TypeError");
    assertException(function () { ArgumentUtils.assertTrue("false"); }, "TypeError");
    assertException(function () { ArgumentUtils.assertTrue("true"); }, "TypeError");
    assertException(function () { ArgumentUtils.assertTrue(0); }, "TypeError");
    assertException(function () { ArgumentUtils.assertTrue(1); }, "TypeError");
    assertException(function () { ArgumentUtils.assertTrue(false); }, "TypeError");
    assertException(function () { ArgumentUtils.assertTrue(); }, "TypeError");
  },

  testAssertFalse: function () {
    ArgumentUtils.assertFalse(false);

    assertException(function () { ArgumentUtils.assertFalse(null); }, "TypeError");
    assertException(function () { ArgumentUtils.assertFalse("false"); }, "TypeError");
    assertException(function () { ArgumentUtils.assertFalse("true"); }, "TypeError");
    assertException(function () { ArgumentUtils.assertFalse(0); }, "TypeError");
    assertException(function () { ArgumentUtils.assertFalse(1); }, "TypeError");
    assertException(function () { ArgumentUtils.assertFalse(true); }, "TypeError");
    assertException(function () { ArgumentUtils.assertFalse(); }, "TypeError");
  },

  testAssertNumber: function () {
    ArgumentUtils.assertNumber(5);
    ArgumentUtils.assertNumber(5.9);

    assertException(function () { ArgumentUtils.assertNumber(null); }, "TypeError");
    assertException(function () { ArgumentUtils.assertNumber('1'); }, "TypeError");
    assertException(function () { ArgumentUtils.assertNumber('bla'); }, "TypeError");
    assertException(function () { ArgumentUtils.assertNumber(false); }, "TypeError");
    assertException(function () { ArgumentUtils.assertNumber(true); }, "TypeError");
    assertException(function () { ArgumentUtils.assertNumber({}); }, "TypeError");
    assertException(function () { ArgumentUtils.assertNumber(); }, "TypeError");
  },

  testAssertRange: function () {
    ArgumentUtils.assertRange(4, 4, 6);
    ArgumentUtils.assertRange(5, 4, 6);
    ArgumentUtils.assertRange(6, 4, 6);
    ArgumentUtils.assertRange(5.9, 4, 6);

    ArgumentUtils.assertRange(8, 4);

    assertException(function () { ArgumentUtils.assertRange(3.99, 4, 6); }, "TypeError");
    assertException(function () { ArgumentUtils.assertRange(6.01, 4, 6); }, "TypeError");
    assertException(function () { ArgumentUtils.assertRange(null, 4, 6); }, "TypeError");
    assertException(function () { ArgumentUtils.assertRange('1', 4, 6); }, "TypeError");
    assertException(function () { ArgumentUtils.assertRange('bla', 4, 6); }, "TypeError");
    assertException(function () { ArgumentUtils.assertRange(false, 4, 6); }, "TypeError");
    assertException(function () { ArgumentUtils.assertRange(true, 4, 6); }, "TypeError");
    assertException(function () { ArgumentUtils.assertRange(3.99, 4); }, "TypeError");
    assertException(function () { ArgumentUtils.assertRange(1, 0, 0); }, "TypeError");
  },

  testAssertString: function () {
    ArgumentUtils.assertString('text');

    assertException(function () { ArgumentUtils.assertString(null); }, "TypeError");
    assertException(function () { ArgumentUtils.assertString(1); }, "TypeError");
    assertException(function () { ArgumentUtils.assertString(false); }, "TypeError");
    assertException(function () { ArgumentUtils.assertString(true); }, "TypeError");
    assertException(function () { ArgumentUtils.assertString({}); }, "TypeError");
    assertException(function () { ArgumentUtils.assertString(); }, "TypeError");
  },

  testAssertBoolean: function () {
    ArgumentUtils.assertBoolean(true);
    ArgumentUtils.assertBoolean(false);

    assertException(function () { ArgumentUtils.assertBoolean(null); }, "TypeError");
    assertException(function () { ArgumentUtils.assertBoolean(1); }, "TypeError");
    assertException(function () { ArgumentUtils.assertBoolean(''); }, "TypeError");
    assertException(function () { ArgumentUtils.assertBoolean({}); }, "TypeError");
    assertException(function () { ArgumentUtils.assertBoolean(); }, "TypeError");
  },

  testAssertFunction: function () {
    ArgumentUtils.assertFunction(function () {});

    assertException(function () { ArgumentUtils.assertFunction(null); }, "TypeError");
    assertException(function () { ArgumentUtils.assertFunction(1); }, "TypeError");
    assertException(function () { ArgumentUtils.assertFunction(true); }, "TypeError");
    assertException(function () { ArgumentUtils.assertFunction(''); }, "TypeError");
    assertException(function () { ArgumentUtils.assertFunction({}); }, "TypeError");
    assertException(function () { ArgumentUtils.assertFunction(); }, "TypeError");
  },

  testAssertMap: function () {
    ArgumentUtils.assertMap({});

    assertException(function () { ArgumentUtils.assertMap(null); }, "TypeError");
    assertException(function () { ArgumentUtils.assertMap([]); }, "TypeError");
    assertException(function () { ArgumentUtils.assertMap(1); }, "TypeError");
    assertException(function () { ArgumentUtils.assertMap(""); }, "TypeError");
    assertException(function () { ArgumentUtils.assertMap(false); }, "TypeError");
    assertException(function () { ArgumentUtils.assertMap(true); }, "TypeError");
    assertException(function () { ArgumentUtils.assertMap(); }, "TypeError");
  },

  testAssertMapWithPredicate: function () {
    ArgumentUtils.assertMap({ a: 1, b: 2 }, function (key, value) {
      ArgumentUtils.assertTrue((key === 'a' && value === 1) || (key === 'b' && value === 2));
    });

    assertException(function () {
      ArgumentUtils.assertMap({ a: 1, b: 3 }, function (key, value) {
        ArgumentUtils.assertTrue((key === 'a' && value === 1) || (key === 'b' && value === 2));
      });
    }, 'TypeError');
  },

  testAssertArray: function () {
    ArgumentUtils.assertArray([ 1, 2 ]);

    assertException(function () { ArgumentUtils.assertArray(null); }, 'TypeError');
    assertException(function () { ArgumentUtils.assertArray(); }, 'TypeError');
    assertException(function () { ArgumentUtils.assertArray(true); }, 'TypeError');
    assertException(function () { ArgumentUtils.assertArray(1); }, 'TypeError');
    assertException(function () { ArgumentUtils.assertArray('test'); }, 'TypeError');
    assertException(function () { ArgumentUtils.assertArray({ length: 1 }); }, 'TypeError');
    assertException(function () { ArgumentUtils.assertArray({ toString: function () { return '[object Array]'; } }); }, 'TypeError');
    assertException(function () { ArgumentUtils.assertArray(function () {}); }, 'TypeError');
  },

  testAssertArrayWithPredicate: function () {
    ArgumentUtils.assertArray([ 1, 2 ], function (elem) {
      ArgumentUtils.assertTrue(elem === 1 || elem === 2);
    });

    assertException(function () {
      ArgumentUtils.assertArray([ 1, 3 ], function (elem) {
        ArgumentUtils.assertTrue(elem === 1 || elem === 2);
      });
    }, 'TypeError');
  },

  testAssertType: function () {
    var type1 = { getType: function () { return 'type1'; }};
    var type2 = { getType: function () { return 'type2'; }};
    var obj1 = TypeUtils.addType({}, type1);
    var obj2 = TypeUtils.addType(TypeUtils.addType({}, type1), type2);

    ArgumentUtils.assertType(obj1, type1);
    ArgumentUtils.assertType(obj2, type1);
    ArgumentUtils.assertType(obj2, type2);

    var a = {};
    assertException(function () { ArgumentUtils.assertType(obj1, type2); }, "TypeError");
    assertException(function () { ArgumentUtils.assertType(null, type2); }, "TypeError");
    assertException(function () { ArgumentUtils.assertType(a.b, type2); }, "TypeError");
  },

  testAssertContains: function () {
    ArgumentUtils.assertContains(1, [1, 2]);
    ArgumentUtils.assertContains(null, [1, null, 2]);

    ArgumentUtils.assertContains(1, { a: 1, b: 2 });
    ArgumentUtils.assertContains(null, { a: 1, b: null });

    assertException(function () { ArgumentUtils.assertContains(0, [1, 2]); }, "TypeError");
    assertException(function () { ArgumentUtils.assertContains(0, []); }, "TypeError");
    assertException(function () { ArgumentUtils.assertContains(null, [1, 2]); }, "TypeError");

    assertException(function () { ArgumentUtils.assertContains(0, { a: 1, b: 2 }); }, "TypeError");
    assertException(function () { ArgumentUtils.assertContains(0, {}); }, "TypeError");
    assertException(function () { ArgumentUtils.assertContains(null, { a: 1, b: 2 }); }, "TypeError");
  }
});
