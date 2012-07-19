net.riemschneider.utils = net.riemschneider.utils || {};

// An observer pattern based on a topic that is owned by an observable and sends notifications about topic events
// to the registered observers.
(function () {
  var ArrayUtils = net.riemschneider.utils.ArrayUtils;

  net.riemschneider.utils.Observer = {
    createTopic: function createTopic() {
      var observers = [];

      return {
        registerObserver: function registerObserver(observerFunc) {
          observers.push(observerFunc);
        },

        unregisterObserver: function unregisterObserver(observerFunc) {
          ArrayUtils.removeElement(observers, observerFunc);
        },

        notify: function notify(data) {
          for (var idx = 0, end = observers.length; idx < end; ++idx) {
            observers[idx](data);
          }
        }
      };
    }
  };
}());
