var Storage = net.riemschneider.storage.Storage;

TestCase('StorageTest', {
  setUp: function () {
    this.storage = Storage.create();
    this.storage.remove();
  },

  tearDown: function () {
    this.storage.remove();
  },

  testSetAndGet: function () {
    this.storage.set({ foo: 1, bar: 2 });
    var state = this.storage.get();
    assertEquals(1, state.foo);
    assertEquals(2, state.bar);
  },

  testGetDefault: function () {
    assertNull(this.storage.get());
  },

  testRemove: function () {
    this.storage.set({ foo: 1, bar: 2 });
    this.storage.remove();
    assertNull(this.storage.get());
  }
});
