var JobQueue = net.riemschneider.structures.JobQueue;
var AsyncTestUtils = net.riemschneider.testutils.AsyncTestUtils;

AsyncTestCase("JobQueueTest", {
  testSyncJob: function (testQueue) {
    var job1Done = false;
    var job2Done = false;
    var jobQueue = JobQueue.create(1);
    var job1 = jobQueue.createSyncJob(function () { job1Done = true; });
    var job2 = jobQueue.createSyncJob(function () { job2Done = true; });

    AsyncTestUtils.defineAsyncTest(testQueue,
        function () {
          jobQueue.addJob(job1);
          jobQueue.addJob(job2);
        },
        function () {
          assertTrue(job1Done);
          assertTrue(job2Done);
        }
    );
  },

  testAsyncJob: function (testQueue) {
    function worker(onDone) {
      setTimeout(function () { onDone('ok'); }, 0);
    }

    var job1Result;
    var job2Result;
    var jobQueue = JobQueue.create(1);
    var job1 = jobQueue.createAsyncJob(function (cb) { worker(function(result) { job1Result = result; cb(); }); });
    var job2 = jobQueue.createAsyncJob(function (cb) { worker(function(result) { job2Result = result; cb(); }); });

    AsyncTestUtils.defineAsyncTest(testQueue,
        function () {
          jobQueue.addJob(job1);
          jobQueue.addJob(job2);
        },
        function () {
          assertEquals('ok', job1Result);
          assertEquals('ok', job2Result);
        }
    );
  },

  testSyncJobRemove: function (testQueue) {
    var job1Done = false;
    var job2Done = false;
    var job3Done = false;
    var jobQueue = JobQueue.create(1);
    var job3 = jobQueue.createSyncJob(function () { job3Done = true; });
    var job2 = jobQueue.createSyncJob(function () { job2Done = true; });
    var job1 = jobQueue.createSyncJob(function () { job1Done = true; jobQueue.removeJob(job2); });

    AsyncTestUtils.defineAsyncTest(testQueue,
        function () {
          jobQueue.addJob(job1);
          jobQueue.addJob(job2);
          jobQueue.addJob(job3);
        },
        function () {
          assertTrue(job1Done);
          assertFalse(job2Done);
          assertTrue(job3Done);
        }
    );
  },

  testAsyncJobRemove: function (testQueue) {
    function worker(onDone) {
      setTimeout(function () { onDone('ok'); }, 0);
    }

    var job1Result;
    var job2Result;
    var job3Result;
    var jobQueue = JobQueue.create(1);
    var job3 = jobQueue.createAsyncJob(function (cb) { worker(function(result) { job3Result = result; cb(); }); });
    var job2 = jobQueue.createAsyncJob(function (cb) { worker(function(result) { job2Result = result; cb(); }); });
    var job1 = jobQueue.createAsyncJob(function (cb) {
      worker(function(result) { job1Result = result; jobQueue.removeJob(job2); cb(); });
    });

    AsyncTestUtils.defineAsyncTest(testQueue,
        function () {
          jobQueue.addJob(job1);
          jobQueue.addJob(job2);
          jobQueue.addJob(job3);
        },
        function () {
          assertEquals('ok', job1Result);
          assertUndefined(job2Result);
          assertEquals('ok', job3Result);
        }
    );
  },

  testSyncJobWithPriority: function (testQueue) {
    var jobOrder = [];
    var jobQueue = JobQueue.create(1, JobQueue.PRIO);
    var job1 = jobQueue.createSyncJob(function () { jobOrder.push(1); }, 1);
    var job2 = jobQueue.createSyncJob(function () { jobOrder.push(2); }, 2);
    var job3 = jobQueue.createSyncJob(function () { jobOrder.push(3); }, 3);

    AsyncTestUtils.defineAsyncTest(testQueue,
        function () {
          jobQueue.addJob(job1);
          jobQueue.addJob(job3);
          jobQueue.addJob(job2);
        },
        function () {
          assertEquals(3, jobOrder.length);
          assertEquals(1, jobOrder[0]);
          assertEquals(2, jobOrder[1]);
          assertEquals(3, jobOrder[2]);
        }
    );
  },

  testNumberOfConcurrentJobs: function (testQueue) {
    function worker(time, onDone) {
      setTimeout(function () { onDone(); }, time);
    }

    var jobOrder = [];
    var jobQueue = JobQueue.create(2);
    var job1 = jobQueue.createAsyncJob(function (cb) { worker(10, function() { jobOrder.push(1); cb(); }); });
    var job2 = jobQueue.createAsyncJob(function (cb) { worker(0, function() { jobOrder.push(2); cb(); }); });

    AsyncTestUtils.defineAsyncTest(testQueue,
        function () {
          jobQueue.addJob(job1);
          jobQueue.addJob(job2);
        },
        function () {
          assertEquals(2, jobOrder.length);
          assertEquals(2, jobOrder[0]);
          assertEquals(1, jobOrder[1]);
        }
    );
  },

  testPauseAndResume: function (testQueue) {
    var job1Done = false;
    var job2Done = false;
    var onPausedCalled = false;
    var jobQueue = JobQueue.create(1);

    var job2 = jobQueue.createSyncJob(function () { job2Done = true; });
    var job1 = jobQueue.createSyncJob(function () {
      job1Done = true;
      jobQueue.pause(function (pausedJob) {
        assertSame(job2, pausedJob);
        assertTrue(jobQueue.isPaused());
        assertFalse(job2Done);
        onPausedCalled = true;
        jobQueue.resume();
      });
    });

    AsyncTestUtils.defineAsyncTest(testQueue,
        function () {
          jobQueue.addJob(job1);
          jobQueue.addJob(job2);
        },
        function () {
          assertTrue(job1Done);
          assertTrue(onPausedCalled);
          assertTrue(job2Done);
        }
    );
  }
});
