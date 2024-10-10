import { RDSDataClient } from "@aws-sdk/client-rds-data";
import { drizzle } from "drizzle-orm/aws-data-api/pg";
import { Resource } from "sst";

const client = new RDSDataClient({});

export const db = drizzle(client, {
  database: Resource.MyPostgres.database,
  secretArn: Resource.MyPostgres.secretArn,
  resourceArn: Resource.MyPostgres.clusterArn,
});
