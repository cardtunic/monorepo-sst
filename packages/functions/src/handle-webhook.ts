import { SendMessageCommand, SQSClient } from "@aws-sdk/client-sqs";
import { Util } from "@monorepo-sst/core/util";
import { Resource } from "sst";

export const main = Util.handler(async (event) => {
  const sqs = new SQSClient({});

  if (!event.body) return JSON.stringify({ message: "BODY EMPTY" });

  await sqs.send(
    new SendMessageCommand({
      QueueUrl: Resource.ClickupEvents.url,
      MessageBody: event.body,
    })
  );

  return JSON.stringify({ message: "SENT" });
});
