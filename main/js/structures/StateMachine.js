net.riemschneider.structures = net.riemschneider.structures || {};

// A simple state machine.
(function () {
  var ArgumentUtils = net.riemschneider.utils.ArgumentUtils;
  var State = net.riemschneider.structures.State;
  var TypeUtils = net.riemschneider.utils.TypeUtils;

  net.riemschneider.structures.StateMachine = {
    create: function create() {
      var currentState = null;
      var startState = null;
      var states = {};

      return {
        registerState: function registerState(stateId, state, isStartState) {
          ArgumentUtils.assertString(stateId);
          ArgumentUtils.assertType(state, State);
          ArgumentUtils.assertBoolean(isStartState);
          ArgumentUtils.assertUndefined(states[stateId]);

          states[stateId] = state;
          if (isStartState) {
            ArgumentUtils.assertTrue(startState === null);
            startState = state;
          }
        },

        start: function start() {
          ArgumentUtils.assertNotNull(startState);
          startState.onEnter();
          currentState = startState;
        },

        transitionTo: function transitionTo(stateId) {
          ArgumentUtils.assertNotNull(currentState);
          ArgumentUtils.assertString(stateId);
          var state = states[stateId];
          ArgumentUtils.assertNotNull(state);

          currentState.onLeave();
          state.onEnter();
          currentState = state;
        }
      };
    }
  };

  TypeUtils.enhance('net.riemschneider.structures.StateMachine', net.riemschneider.structures.StateMachine);
}());
