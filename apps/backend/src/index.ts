import "dotenv/config";
import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { db, sql } from "@repo/database";

const app = new Hono();

app
  .get("/", async (c) => {
    return c.text("Hello, World!");
  })
  .basePath("/api")
  .basePath("/v1")
  .basePath("/env")
  .get("/pg-version", async (c) => {
    const test = await db.execute(sql`SELECT version()`);
    return c.json(test.rows[0].version as string);
  });

serve(
  {
    fetch: app.fetch,
    port: 3000,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  }
);
