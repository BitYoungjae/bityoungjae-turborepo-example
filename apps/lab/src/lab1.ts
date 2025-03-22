import { db, sql, testTable } from "@repo/database";
import { sleep } from "./util";
import { Ora } from "ora";

async function lab1(action: string, ctx: { ora: Ora }) {
  if (action === "update") {
    await db.delete(testTable);
    await db
      .insert(testTable)
      .values([
        { value: 1 },
        { value: 2 },
        { value: 3 },
        { value: 4 },
        { value: 5 },
      ]);

    while (true) {
      await db.update(testTable).set({
        value: sql`round(random() * 10000)`,
      });

      await sleep(500);
    }
  }

  if (action === "test1") {
    while (true) {
      const query = sql`
    WITH 
      cte_1 AS (
        SELECT sum(${testTable.value}) AS s1
        FROM ${testTable}
      ),
      cte_2 AS (
        SELECT sum(${testTable.value}) AS s2
        FROM ${testTable}
      ),
      cte_3 AS (
        SELECT sum(${testTable.value}) AS s3
        FROM ${testTable}
      )
    SELECT
      (SELECT s1 FROM cte_1),
      (SELECT s2 FROM cte_2),
      (SELECT s3 FROM cte_3);
    `;
      const test = await db.execute(query);
      const resultTuple = test.rows[0] as {
        s1: number;
        s2: number;
        s3: number;
      };

      if (
        resultTuple.s1 !== resultTuple.s2 ||
        resultTuple.s2 !== resultTuple.s3
      ) {
        ctx.ora.fail(JSON.stringify(resultTuple));
      }

      await sleep(500);
    }
  }

  if (action === "test2") {
    while (true) {
      const query = sql`
      WITH 
        cte_1 AS MATERIALIZED (
          SELECT sum(${testTable.value}) AS s1
          FROM ${testTable}
        ),
        cte_2 AS MATERIALIZED (
          SELECT sum(${testTable.value}) AS s2
          FROM ${testTable}
        ),
        cte_3 AS MATERIALIZED (
          SELECT sum(${testTable.value}) AS s3
          FROM ${testTable}
        )
      SELECT
        (SELECT s1 FROM cte_1),
        (SELECT s2 FROM cte_2),
        (SELECT s3 FROM cte_3);
      `;
      const test = await db.execute(query);
      const resultTuple = test.rows[0] as {
        s1: number;
        s2: number;
        s3: number;
      };

      if (
        resultTuple.s1 !== resultTuple.s2 ||
        resultTuple.s2 !== resultTuple.s3
      ) {
        ctx.ora.fail(JSON.stringify(resultTuple));
      }

      await sleep(500);
    }
  }
}

export default lab1;
