import clickup from "@cardtunic/clickup";
import { Task } from "@cardtunic/clickup/dist/types";
import { SQSRecord } from "aws-lambda";
import crypto from "node:crypto";
import { Resource } from "sst";
import { db } from "../../../../drizzle/db";
import { forms } from "../../../../drizzle/schema";

export const main = async (event: { Records: SQSRecord[] }) => {
  const eventPayload: WebhookPayload & { task: Task } = JSON.parse(
    event.Records[0].body
  );

  const task = eventPayload.task;

  const client = clickup.createClient(Resource.ClickupToken.value);

  const requiredCustomFields = [
    { id: "a790acb2-1620-44fd-badf-aa3a39485017", name: "Produto" },
    { id: "0b83bace-c1af-4d29-8209-a6ff3cb1fb10", name: "Closer" },
    { id: "fbf586d8-24ce-4046-9565-66c2cad61367", name: "Email" },
    { id: "00d500d2-8376-4816-bc5b-99769fc2d57a", name: "Empresa" },
    { id: "e5f9da35-8703-4f66-9d5f-455518be38ed", name: "SDR" },
    { id: "5ce9a686-3f58-423b-bd34-aac204a70a89", name: "Whatsapp" },
  ];

  const notFilledCustomFields = requiredCustomFields.filter(
    (rc) => !task.custom_fields_values.find((cv) => cv.id === rc.id)?.value
  );

  if (notFilledCustomFields.length > 0) {
    await client.tasks.update(task.id, {
      status: "followups",
    });

    await client.tasks.createComment(
      task.id, //@ts-ignore
      {
        comment_text: `⚠️ Não é possível iniciar a automação, pois os campos personalizados abaixo não estão preenchidos:\n\n${notFilledCustomFields
          .map((c, i) => `${i + 1}. ${c.name}`)
          .join("\n")}`,
        notify_all: false,
      }
    );

    return;
  }

  const [{ formId }] = await db
    .insert(forms)
    .values({
      id: crypto.randomBytes(8).toString("hex"),
      type: "company_customer_register",
    })
    .returning({
      formId: forms.id,
    });

  await client.tasks.createComment(
    task.id,
    //@ts-ignore
    {
      comment_text: `Formulário criado ${formId}`,
    }
  );
};
