var State = net.riemschneider.structures.State;
var TypeUtils = net.riemschneider.utils.TypeUtils;

TestCase('StateTest', {
  testCreate: function () {
    var registered = false;
    var stateMachine = {
      registerState: function registerState(stateId, state, isStartState) {
        registered = true;
        assertEquals('id', stateId);
        assertFalse(isStartState);
        assertTrue(TypeUtils.isOfType(state, State));
        state.onEnter();
        state.onLeave();
      }
    };
    TypeUtils.addType(stateMachine, net.riemschneider.structures.StateMachine);
    var state = State.create(stateMachine, 'id', false);
    assertTrue(TypeUtils.isOfType(state, State));
    assertTrue(registered);
  },

  testNullAndTypeSafe: function () {
    var stateMachine = {};
    TypeUtils.addType(stateMachine, net.riemschneider.structures.StateMachine);
    assertException(function () { State.create(stateMachine, 'id', null); }, 'TypeError');
    assertException(function () { State.create(stateMachine, null, true); }, 'TypeError');
    assertException(function () { State.create(null, 'id', true); }, 'TypeError');

    assertException(function () { State.create(stateMachine, 123, true); }, 'TypeError');
    assertException(function () { State.create(stateMachine, 'id', 0); }, 'TypeError');
    assertException(function () { State.create({}, 'id', true); }, 'TypeError');
  }
});
