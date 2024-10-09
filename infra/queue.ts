export const queue = new sst.aws.Queue("ClickupEvents");

queue.subscribe("packages/functions/src/events/task-status-updated.main");
