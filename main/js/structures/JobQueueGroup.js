net.riemschneider.structures = net.riemschneider.structures || {};

// Defines a set of job queues used for different purposes, but that are all coordinated by the same group.
(function () {
  var ClosureUtils = net.riemschneider.utils.ClosureUtils;

  net.riemschneider.structures.JobQueueGroup = {
    create: function create(jobQueues) {
      return {
        pause: function pause(onJobPaused) {
          for (var idx = 0, end = jobQueues.length; idx < end; ++idx) {
            jobQueues[idx].pause(onJobPaused);
          }
        },

        resume: function resume() {
          for (var idx = 0, end = jobQueues.length; idx < end; ++idx) {
            jobQueues[idx].resume();
          }
        }
      }
    }
  }
}());
