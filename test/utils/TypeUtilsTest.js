var TypeUtils = net.riemschneider.utils.TypeUtils;

TestCase("TypeUtilsTest", {
  testEnhance: function () {
    var typeObj = TypeUtils.enhance('Type', {
      create: function (name) {
        return { name: name };
      }
    });

    var obj = typeObj.create('test');
    assertEquals('test', obj.name);
    assertTrue(TypeUtils.isOfType(obj, typeObj));
    assertEquals('Type', typeObj.getType());
    assertEquals('Type', typeObj.toString());
  },

  testEnhanceEnum: function () {
    var typeObj = TypeUtils.enhanceEnum('Enum', {
      KEY1: { value: 'KEY1' },
      KEY2: { value: 'KEY2' }
    });

    assertTrue(TypeUtils.isOfType(typeObj.KEY1, typeObj));
    assertTrue(TypeUtils.isOfType(typeObj.KEY2, typeObj));
  },

  testAddTypeAndIsOfType: function () {
    var obj = {};
    var type1 = { getType: function () { return 'type1'; }};
    var type2 = { getType: function () { return 'type2'; }};
    var type3 = { getType: function () { return 'type3'; }};
    TypeUtils.addType(obj, type1);
    TypeUtils.addType(obj, type2);
    assertTrue(TypeUtils.isOfType(obj, type1));
    assertTrue(TypeUtils.isOfType(obj, type2));
    assertFalse(TypeUtils.isOfType(obj, type3));
  },

  testAddTypeRequiresWellDefinedType: function () {
    assertException(function () { TypeUtils.addType({}, {}); } );
    assertException(function () { TypeUtils.addType({}, null); } );
  },

  testIsOfTypeRequiresWellDefinedType: function () {
    assertException(function () { TypeUtils.isOfType({}, {}); } );
    assertException(function () { TypeUtils.isOfType({}, null); } );
  },

  testFilterByType: function () {
    var type1 = { getType: function () { return 'type1'; }};
    var type2 = { getType: function () { return 'type2'; }};
    var type3 = { getType: function () { return 'type3'; }};

    var obj1 = {};
    TypeUtils.addType(obj1, type1);
    TypeUtils.addType(obj1, type2);

    var obj2 = {};
    TypeUtils.addType(obj2, type2);
    TypeUtils.addType(obj2, type3);

    var obj3 = {};
    TypeUtils.addType(obj3, type1);
    TypeUtils.addType(obj3, type3);

    var array = [ obj1, obj2, obj3 ];
    var filtered = TypeUtils.filterByType(array, type1);
    assertEquals(2, filtered.length);
    assertSame(obj1, filtered[0]);
    assertSame(obj3, filtered[1]);
  }
});
