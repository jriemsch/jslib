net.riemschneider.structures = net.riemschneider.structures || {};

// A state base implementation that is connected with a view for usage with the state machine.
(function () {
  var TypeUtils = net.riemschneider.utils.TypeUtils;
  var State = net.riemschneider.structures.State;
  var ArgumentUtils = net.riemschneider.utils.ArgumentUtils;

  net.riemschneider.structures.ViewState = {
    create: function create(stateMachine, stateId, isStartState, view) {
      ArgumentUtils.assertNotNull(view);
      ArgumentUtils.assertFunction(view.show);
      ArgumentUtils.assertFunction(view.hide);

      var state = State.create(stateMachine, stateId, isStartState);
      state.onEnter = function onEnter() {
        state.onConfigureView();
        view.show();
      };

      state.onLeave = function onLeave() {
        view.hide();
      };

      state.onConfigureView = function onConfigureView() {};

      return state;
    }
  };

  TypeUtils.enhance('net.riemschneider.structures.ViewState', net.riemschneider.structures.ViewState);
}());
