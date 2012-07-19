var Observer = net.riemschneider.utils.Observer;

TestCase("ObserverTest", {
  setUp: function () {
    this.topic = Observer.createTopic();
    this.observer1Objs = [];
    this.observer2Objs = [];
    this.testObj = {};

    var test = this;
    this.observer1 = function (obj) { test.observer1Objs.push(obj); };
    this.observer2 = function (obj) { test.observer2Objs.push(obj); };

    this.topic.registerObserver(this.observer1);
    this.topic.registerObserver(this.observer2);
  },

  testRegisterAndNotify: function () {
    this.topic.notify(this.testObj);
    assertEquals(1, this.observer1Objs.length);
    assertSame(this.testObj, this.observer1Objs[0]);
    assertEquals(1, this.observer2Objs.length);
    assertSame(this.testObj, this.observer2Objs[0]);
  },

  testUnregisterAndNotify: function () {
    this.topic.unregisterObserver(this.observer1);
    this.topic.notify(this.testObj);
    assertEquals(0, this.observer1Objs.length);
    assertEquals(1, this.observer2Objs.length);
    assertSame(this.testObj, this.observer2Objs[0]);
  }
});
