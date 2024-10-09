import clickup from "@cardtunic/clickup";
import { SQSRecord } from "aws-lambda";
import { Resource } from "sst";

export const main = async (event: { Records: SQSRecord[] }) => {
  const eventPayload: WebhookPayload = JSON.parse(event.Records[0].body);

  if (
    eventPayload.event !== "taskStatusUpdated" ||
    eventPayload.history_items[0].after.status !== "in progress"
  ) {
    return {
      statusCode: 202,
      body: null,
    };
  }

  const client = clickup.createClient(Resource.ClickupToken.value);
  await client.tasks.createComment(
    eventPayload.task_id,
    //@ts-ignore
    {
      comment_text: `'Status atualizado para 'in progress' pelo usuário ${eventPayload.history_items[0].user.username}`,
    }
  );

  return JSON.stringify({ message: "recebido" });
};
