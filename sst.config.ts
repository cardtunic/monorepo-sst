/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "monorepo-sst",
      removal: input?.stage === "production" ? "retain" : "remove",
      home: "aws",
    };
  },
  async run() {
    await import("./infra/secrets");
    await import("./infra/rds");
    await import("./infra/queue");
    const api = await import("./infra/api");

    return {
      api: api.myApi.url,
    };
  },
});
