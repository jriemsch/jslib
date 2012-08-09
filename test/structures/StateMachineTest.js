var StateMachine = net.riemschneider.structures.StateMachine;
var State = net.riemschneider.structures.State;
var TypeUtils = net.riemschneider.utils.TypeUtils;

TestCase('StateMachineTest', {
  testCreate: function () {
    var stateMachine = StateMachine.create();
    assertTrue(TypeUtils.isOfType(stateMachine, StateMachine));
  },

  testStartWithStartState: function () {
    var stateMachine = StateMachine.create();
    var state = State.create(stateMachine, 'id', true);
    var enterCalled = false;
    state.onEnter = function () { enterCalled = true; };
    stateMachine.start();
    assertTrue(enterCalled);
  },

  testStartWithoutStartState: function () {
    var stateMachine = StateMachine.create();
    State.create(stateMachine, 'id', false);
    assertException(function () { stateMachine.start(); }, 'TypeError');
  },

  testTwoStartStates: function () {
    var stateMachine = StateMachine.create();
    State.create(stateMachine, 'id1', true);
    assertException(function () { State.create(stateMachine, 'id2', true); }, 'TypeError');
  },

  testTransitionTo: function () {
    var stateMachine = StateMachine.create();
    var fromState = State.create(stateMachine, 'from', true);
    var fromEnterCalled = false;
    var fromLeaveCalled = false;
    var toEnterCalled = false;
    fromState.onEnter = function () { fromEnterCalled = true; };
    fromState.onLeave = function () { assertFalse(toEnterCalled); fromLeaveCalled = true; };
    var toState = State.create(stateMachine, 'to', false);
    toState.onEnter = function () { assertTrue(fromLeaveCalled); toEnterCalled = true; };
    stateMachine.start();
    assertTrue(fromEnterCalled);
    stateMachine.transitionTo('to');
    assertTrue(toEnterCalled);
  },

  testRegisterStateNullAndTypeSafe: function () {
    var stateMachine = StateMachine.create();
    var state = {};
    TypeUtils.addType(state, State);

    assertException(function () { stateMachine.registerState('id2', state, null); }, 'TypeError');
    assertException(function () { stateMachine.registerState('id2', null, true); }, 'TypeError');
    assertException(function () { stateMachine.registerState(null, state, true); }, 'TypeError');

    assertException(function () { stateMachine.registerState('id2', state, ''); }, 'TypeError');
    assertException(function () { stateMachine.registerState('id2', {}, true); }, 'TypeError');
    assertException(function () { stateMachine.registerState(123, state, true); }, 'TypeError');
  },

  testRegisterStateTwice: function () {
    var stateMachine = StateMachine.create();
    var fromState = State.create(stateMachine, 'from', false);
    assertException(function () { stateMachine.registerState('from', fromState, false); }, 'TypeError');
  },

  testTransitionToNullAndTypeSafe: function () {
    var stateMachine = StateMachine.create();
    State.create(stateMachine, 'start', true);
    stateMachine.start();
    assertException(function () { stateMachine.transitionTo(null); }, 'TypeError');

    assertException(function () { stateMachine.transitionTo(123); }, 'TypeError');
  },

  testTransitionToStateMustExist: function () {
    var stateMachine = StateMachine.create();
    State.create(stateMachine, 'start', true);
    stateMachine.start();
    assertException(function () { stateMachine.transitionTo('to'); }, 'TypeError');
  },

  testTransitionToStateMachineMustBeStarted: function () {
    var stateMachine = StateMachine.create();
    State.create(stateMachine, 'to', true);
    assertException(function () { stateMachine.transitionTo('to'); }, 'TypeError');
  }
});