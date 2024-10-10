import { SendMessageCommand, SQSClient } from "@aws-sdk/client-sqs";
import clickup from "@cardtunic/clickup";
import { Util } from "@monorepo-sst/core/util";
import { Resource } from "sst";

export const main = Util.handler(async (event) => {
  const sqs = new SQSClient({});

  console.log("evento de webhook recebido");

  if (!event.body) return JSON.stringify({ message: "BODY EMPTY" });

  let eventPayload = JSON.parse(event.body);

  eventPayload.history_items = eventPayload.history_items.sort(
    (a: HistoryItem, b: HistoryItem) => Number(b.date) - Number(a.date)
  )[0];

  const client = clickup.createClient(Resource.ClickupToken.value);
  const task = await client.tasks.get(eventPayload.task_id);

  eventPayload.task = task;

  await sqs.send(
    new SendMessageCommand({
      QueueUrl: Resource.ClickupEvents.url,
      MessageBody: JSON.stringify(eventPayload),
    })
  );

  return JSON.stringify({ message: "SENT" });
});
