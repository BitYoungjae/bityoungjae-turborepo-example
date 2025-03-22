import { sql } from "drizzle-orm";
import {
  integer,
  pgTable,
  text,
  unique,
  uniqueIndex,
} from "drizzle-orm/pg-core";

export const testTable = pgTable("test", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  value: integer().notNull().default(0),
});

export const testTable2 = pgTable(
  "test2",
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    key: text().notNull(),
    value: integer().notNull().default(0),
  },
  (table) => [
    uniqueIndex("test2_unique_key_value")
      .on(table.key)
      .where(sql`${table.value} = 0`),
  ]
);
