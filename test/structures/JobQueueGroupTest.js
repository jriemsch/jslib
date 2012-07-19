var JobQueue = net.riemschneider.structures.JobQueue;
var JobQueueGroup = net.riemschneider.structures.JobQueueGroup;

TestCase('JobQueueGroupTest', {
  testPause: function () {
    var queue1 = JobQueue.create(1, JobQueue.FIFO);
    var queue2 = JobQueue.create(1, JobQueue.FIFO);
    var group = JobQueueGroup.create([queue1, queue2]);
    var fakeJob1 = function () { fail('should be executeed'); };
    var fakeJob2 = function () { fail('should be executeed'); };

    var pausedJobs = 0;
    group.pause(function () { ++pausedJobs; });
    queue1.addJob(fakeJob1);
    queue2.addJob(fakeJob2);
    assertTrue(queue1.isPaused());
    assertTrue(queue2.isPaused());
    assertEquals(2, pausedJobs);
  },

  testResume: function () {
    var queue1 = JobQueue.create(1, JobQueue.FIFO);
    var queue2 = JobQueue.create(1, JobQueue.FIFO);
    var group = JobQueueGroup.create([queue1, queue2]);

    group.pause();
    group.resume();
    assertFalse(queue1.isPaused());
    assertFalse(queue2.isPaused());
  }
});
