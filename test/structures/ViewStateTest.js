var State = net.riemschneider.structures.State;
var ViewState = net.riemschneider.structures.ViewState;
var TypeUtils = net.riemschneider.utils.TypeUtils;

TestCase('ViewStateTest', {
  testCreate: function () {
    var registered = false;
    var stateMachine = {
      registerState: function registerState() { registered = true; }
    };
    TypeUtils.addType(stateMachine, net.riemschneider.structures.StateMachine);

    var shown = false;
    var view = {
      show: function () { shown = true; },
      hide: function () { shown = false; }
    };

    var state = ViewState.create(stateMachine, 'id', false, view);
    assertTrue(TypeUtils.isOfType(state, State));
    assertTrue(TypeUtils.isOfType(state, ViewState));
    assertTrue(registered);
    state.onEnter();
    assertTrue(shown);
    state.onLeave();
    assertFalse(shown);
  },

  testNullAndTypeSafe: function () {
    var stateMachine = {};
    TypeUtils.addType(stateMachine, net.riemschneider.structures.StateMachine);
    assertException(function () { ViewState.create(stateMachine, 'id', true, null); }, 'TypeError');

    assertException(function () { ViewState.create(stateMachine, 'id', true, {}); }, 'TypeError');
    assertException(function () { ViewState.create(stateMachine, 'id', true, { show: function () {}}); }, 'TypeError');
    assertException(function () { ViewState.create(stateMachine, 'id', true, { hide: function () {}}); }, 'TypeError');
  }
});
