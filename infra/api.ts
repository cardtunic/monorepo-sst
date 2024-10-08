const linkable = new sst.Linkable("MyLinkable", {
  properties: { foo: "bar" },
});

export const myApi = new sst.aws.ApiGatewayV2("Api", {
  transform: {
    route: {
      handler: {
        link: [linkable],
      },
    },
  },
});

myApi.route("POST /user", "packages/functions/src/users/create.main");
