net.riemschneider.structures = net.riemschneider.structures || {};

// A simple state machine.
(function () {
  var ArgumentUtils = net.riemschneider.utils.ArgumentUtils;
  var TypeUtils = net.riemschneider.utils.TypeUtils;

  net.riemschneider.structures.StateMachine = {
    create: function create() {
      var currentStateId = null;
      var startStateId = null;
      var states = {};

      return {
        registerState: function registerState(stateId, state, isStartState) {
          ArgumentUtils.assertString(stateId);
          ArgumentUtils.assertType(state, net.riemschneider.structures.State);
          ArgumentUtils.assertBoolean(isStartState);
          ArgumentUtils.assertUndefined(states[stateId]);

          states[stateId] = state;
          if (isStartState) {
            ArgumentUtils.assertTrue(startStateId === null);
            startStateId = stateId;
          }
        },

        start: function start() {
          ArgumentUtils.assertNotNull(startStateId);
          var startState = states[startStateId];
          startState.onEnter();
          currentStateId = startStateId;
        },

        transitionTo: function transitionTo(stateId) {
          ArgumentUtils.assertNotNull(currentStateId);
          ArgumentUtils.assertString(stateId);
          var state = states[stateId];
          ArgumentUtils.assertNotNull(state);

          states[currentStateId].onLeave();
          state.onEnter();
          currentStateId = stateId;
        },

        getCurrentStateId: function getCurrentStateId() {
          return currentStateId;
        }
      };
    }
  };

  TypeUtils.enhance('net.riemschneider.structures.StateMachine', net.riemschneider.structures.StateMachine);
}());
