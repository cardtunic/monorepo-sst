import { boolean, char, pgTable, varchar } from "drizzle-orm/pg-core";

export const forms = pgTable("forms", {
  id: char("id", { length: 16 }).primaryKey(),
  type: varchar("type", {
    enum: ["company_customer_register", "company_info"],
  }),
  sended: boolean("sended").default(false),
});
