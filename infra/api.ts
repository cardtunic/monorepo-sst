import { queue } from "./queue";
import { clickupToken } from "./secrets";

export const myApi = new sst.aws.ApiGatewayV2("Api", {
  transform: {
    route: {
      handler: {
        link: [queue, clickupToken],
      },
    },
  },
});

myApi.route("POST /webhook", "packages/functions/src/handle-webhook.main");
