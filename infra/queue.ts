import { rds } from "./rds";
import { clickupToken } from "./secrets";

export const queue = new sst.aws.Queue("ClickupEvents");

queue.subscribe(
  {
    handler: "packages/functions/src/events/lead-closed.main",
    link: [clickupToken, rds],
  },
  {
    filters: [
      {
        body: {
          event: ["taskStatusUpdated"],
          history_items: {
            after: {
              status: ["negócio fechado"],
            },
          },
          task: {
            list: {
              id: ["900701238768"], // Lista: Sessão Estratégica 30m
            },
          },
        },
      },
    ],
  }
);
