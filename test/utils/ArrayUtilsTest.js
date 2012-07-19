var ArrayUtils = net.riemschneider.utils.ArrayUtils;

TestCase("ArrayUtilsTest", {
  setUp: function () {
    this.o1 = {};
    this.o2 = {};
    this.o3 = {};
    this.o4 = {};
    this.ar = [ this.o1, this.o2, this.o3 ];
  },

  testIndexOf: function () {
    assertEquals(0, ArrayUtils.indexOf(this.ar, this.o1));
    assertEquals(1, ArrayUtils.indexOf(this.ar, this.o2));
    assertEquals(2, ArrayUtils.indexOf(this.ar, this.o3));
  },

  testRemoveElementAt: function () {
    ArrayUtils.removeElementAt(this.ar, 1);
    assertEquals(2, this.ar.length);
    assertSame(this.o1, this.ar[0]);
    assertSame(this.o3, this.ar[1]);

    ArrayUtils.removeElementAt(this.ar, 0);
    assertEquals(1, this.ar.length);
    assertSame(this.o3, this.ar[0]);

    ArrayUtils.removeElementAt(this.ar, 0);
    assertEquals(0, this.ar.length);
  },

  testRemoveElement: function () {
    ArrayUtils.removeElement(this.ar, this.o2);
    assertEquals(2, this.ar.length);
    assertSame(this.o1, this.ar[0]);
    assertSame(this.o3, this.ar[1]);

    ArrayUtils.removeElement(this.ar, this.o1);
    assertEquals(1, this.ar.length);
    assertSame(this.o3, this.ar[0]);

    ArrayUtils.removeElement(this.ar, this.o3);
    assertEquals(0, this.ar.length);

    ArrayUtils.removeElement(this.ar, this.o3);
    assertEquals(0, this.ar.length);
  },

  testInsertElementAt: function () {
    var ar = [];
    ArrayUtils.insertElementAt(ar, 0, this.o1);
    ArrayUtils.insertElementAt(ar, 0, this.o2);
    ArrayUtils.insertElementAt(ar, 2, this.o3);
    ArrayUtils.insertElementAt(ar, 1, this.o4);
    assertSame(this.o2, ar[0]);
    assertSame(this.o4, ar[1]);
    assertSame(this.o1, ar[2]);
    assertSame(this.o3, ar[3]);
  },

  testBinarySearch: function () {
    assertEquals(2, ArrayUtils.binarySearch([1, 2, 4, 5], 3, ArrayUtils.compareNumber));

    assertEquals(0, ArrayUtils.binarySearch([], 1, ArrayUtils.compareNumber));

    assertEquals(0, ArrayUtils.binarySearch([1], 0, ArrayUtils.compareNumber));
    assertEquals(0, ArrayUtils.binarySearch([1], 1, ArrayUtils.compareNumber));
    assertEquals(1, ArrayUtils.binarySearch([1], 2, ArrayUtils.compareNumber));

    assertEquals(0, ArrayUtils.binarySearch([1, 2], 0, ArrayUtils.compareNumber));
    assertEquals(0, ArrayUtils.binarySearch([1, 2], 1, ArrayUtils.compareNumber));
    assertEquals(1, ArrayUtils.binarySearch([1, 2], 2, ArrayUtils.compareNumber));
    assertEquals(2, ArrayUtils.binarySearch([1, 2], 3, ArrayUtils.compareNumber));

    assertEquals(0, ArrayUtils.binarySearch([1, 2, 3], 0, ArrayUtils.compareNumber));
    assertEquals(0, ArrayUtils.binarySearch([1, 2, 3], 1, ArrayUtils.compareNumber));
    assertEquals(1, ArrayUtils.binarySearch([1, 2, 3], 2, ArrayUtils.compareNumber));
    assertEquals(2, ArrayUtils.binarySearch([1, 2, 3], 3, ArrayUtils.compareNumber));
    assertEquals(3, ArrayUtils.binarySearch([1, 2, 3], 4, ArrayUtils.compareNumber));

    assertEquals(0, ArrayUtils.binarySearch([1, 2, 3, 4], 0, ArrayUtils.compareNumber));
    assertEquals(0, ArrayUtils.binarySearch([1, 2, 3, 4], 1, ArrayUtils.compareNumber));
    assertEquals(1, ArrayUtils.binarySearch([1, 2, 3, 4], 2, ArrayUtils.compareNumber));
    assertEquals(2, ArrayUtils.binarySearch([1, 2, 3, 4], 3, ArrayUtils.compareNumber));
    assertEquals(3, ArrayUtils.binarySearch([1, 2, 3, 4], 4, ArrayUtils.compareNumber));
    assertEquals(4, ArrayUtils.binarySearch([1, 2, 3, 4], 5, ArrayUtils.compareNumber));
  },

  testFilter: function () {
    var array = [ 0, 11, 9, 23 ];
    var filtered = ArrayUtils.filter(array, function (elem) { return elem < 10; });
    assertEquals(2, filtered.length);
    assertEquals(0, filtered[0]);
    assertEquals(9, filtered[1]);
  }
});
