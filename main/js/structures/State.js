net.riemschneider.structures = net.riemschneider.structures || {};

// A state base implementation for usage with the state machine.
(function () {
  var TypeUtils = net.riemschneider.utils.TypeUtils;
  var ArgumentUtils = net.riemschneider.utils.ArgumentUtils;

  net.riemschneider.structures.State = {
    create: function create(stateMachine, stateId, isStartState) {
      ArgumentUtils.assertType(stateMachine, net.riemschneider.structures.StateMachine);
      ArgumentUtils.assertString(stateId);
      ArgumentUtils.assertBoolean(isStartState);

      var state = {
        onEnter: function onEnter() {},
        onLeave: function onLeave() {}
      };
      TypeUtils.addType(state, State);
      stateMachine.registerState(stateId, state, isStartState);
      return state;
    }
  };

  TypeUtils.enhance('net.riemschneider.structures.State', net.riemschneider.structures.State);
}());
