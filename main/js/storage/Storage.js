net.riemschneider.storage = net.riemschneider.storage || {};

// Provides access to html5 local storage.
(function () {
  net.riemschneider.storage.Storage = {
    create: function create(key) {
      return {
        set: function set(state) {
          var json = JSON.stringify(state);
          localStorage.setItem(key, json);
        },

        get: function get() {
          var json = localStorage.getItem(key);
          return json ? JSON.parse(json) : null;
        },

        remove: function remove() {
          localStorage.removeItem(key);
        }
      };
    }
  };
}());
