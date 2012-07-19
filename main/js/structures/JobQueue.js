net.riemschneider.structures = net.riemschneider.structures || {};

// A simple job queue implementation.
(function () {
  var ArrayUtils = net.riemschneider.utils.ArrayUtils;

  net.riemschneider.structures.JobQueue = {
    create: function create(numberOfConcurrentJobs, jobQueueOrder) {
      jobQueueOrder = jobQueueOrder || net.riemschneider.structures.JobQueue.FIFO;

      var size = 0;
      var jobs = [];
      var paused = false;
      var onJobPausedCallback;
      var pausedJobs = [];

      function onJobDone() {
        --size;
        var job = jobQueueOrder.pop(jobs);
        if (job) {
          if (paused) {
            pausedJobs.push(job);
            if (onJobPausedCallback) {
              onJobPausedCallback(job);
            }
          }
          else {
            job();
          }
        }
      }

      return {
        createAsyncJob: function createAsyncJob(jobFunc, priority) {
          var job = function () {
            jobFunc(function () {
              onJobDone();
            });
          };
          job.func = jobFunc;
          job.priority = priority || 0;
          return job;
        },

        createSyncJob: function createSyncJob(jobFunc, priority) {
          var job = function () {
            setTimeout(function () { jobFunc(); onJobDone(); }, 0);
          };
          job.priority = priority || 0;
          return job;
        },

        addJob: function addJob(job) {
          if (!paused && size < numberOfConcurrentJobs) {
            job();
          }
          else {
            if (size < numberOfConcurrentJobs) {
              pausedJobs.push(job);
              if (onJobPausedCallback) {
                onJobPausedCallback(job);
              }
            }
            else {
              jobQueueOrder.push(jobs, job);
            }
          }
          ++size;
        },

        removeJob: function removeJob(job) {
          ArrayUtils.removeElement(jobs, job);
          --size;
        },

        pause: function pause(onJobPaused) {
          onJobPausedCallback = onJobPaused;
          paused = true;
        },

        resume: function resume() {
          paused = false;
          for (var idx = 0, end = pausedJobs.length; idx < end; ++idx) {
            pausedJobs[idx]();
          }
          pausedJobs = [];
          onJobPausedCallback = null;
        },

        isPaused: function isPaused() {
          return paused;
        }
      };
    },

    FIFO: {
      push: function (jobs, job) { jobs.push(job); },
      pop: function (jobs) { return jobs.shift(); }
    },

    PRIO: {
      push: function (jobs, job) {
        for (var idx = 0, end = jobs.length; idx < end; ++idx) {
          var prio = job.priority;
          var compJob = jobs[idx];
          if (compJob.priority > prio) {
            ArrayUtils.insertElementAt(jobs, idx, job);
            return;
          }
        }
        jobs.push(job);
      },
      pop: function (jobs) { return jobs.shift(); }
    },

    SYNCHRONOUS: 999999999
  };
}());
