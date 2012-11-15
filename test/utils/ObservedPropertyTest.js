var ObservedProperty = net.riemschneider.utils.ObservedProperty;

TestCase("ObservedPropertyTest", {
  setUp: function () {
    this.obj = {
	  prop: 'initial',
	  setProp: function setProp(value) { this.prop = value; },
	  getProp: function getProp() { return this.prop; }
	};
  },
  
  testCreate: function () {
    var observedProperty = ObservedProperty.create(this.obj, 'prop', function () {});
	assertNotNull(observedProperty);
  },

  testCreateAndSetPropertyWithChangedValue: function () {
	var called = false;
    var observedProperty = ObservedProperty.create(this.obj, 'prop', function (value) { 
	  assertEquals('initial', this.obj.prop);
	  assertEquals('changed', value);
	  called = true; 
	});
	this.obj.setProp('changed');
	assertTrue(called);
	assertEquals('changed', this.obj.prop);
  },

  testCreateAndSetPropertyWithSameValue: function () {
	var called = false;
    var observedProperty = ObservedProperty.create(this.obj, 'prop', function (value) { called = true; });
	this.obj.setProp('initial');
	assertFalse(called);
  },

  testDestroy: function () {
	var originalFunc = this.obj.setProp;
    var observedProperty = ObservedProperty.create(this.obj, 'prop', function () {});
	observedProperty.destroy();
	assertSame(originalFunc, this.obj.setProp);
  }
});
