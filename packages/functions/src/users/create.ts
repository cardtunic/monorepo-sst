import { Util } from "@monorepo-sst/core/util";
import { Resource } from "sst";
import { z } from "zod";

export const main = Util.handler(async (event) => {
  const schema = z.object({
    name: z.string(),
    email: z.string().email(),
  });

  const result = schema.parse(JSON.parse(event.body ?? "{}"));

  return JSON.stringify(Resource.MyLinkable);
});
