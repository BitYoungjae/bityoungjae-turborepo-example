import { db, sql, testTable2 } from "@repo/database";
import { sleep } from "./util";
import { Ora } from "ora";

const KEY = "1";

async function lab2(action: string, ctx: { ora: Ora }) {
  if (action === "update") {
    while (true) {
      await db
        .update(testTable2)
        .set({ value: 1 })
        .where(sql`${testTable2.key} = ${KEY} AND ${testTable2.value} = 0`);
      await sleep(500);
    }
  }

  if (action === "test") {
    while (true) {
      const query = sql`
        WITH inserted AS (
          INSERT INTO test2 (key, value)
          VALUES (${KEY}, 0)
          ON CONFLICT (key)
          WHERE value = 0
          DO NOTHING
          RETURNING value
        ),
        selected AS (
          SELECT value
          FROM test2
          WHERE key = ${KEY}
            AND value = 0
        )
        SELECT value
        FROM inserted
        UNION ALL
        SELECT value
        FROM selected;
      `;

      const result = await db.execute(query);
      const selectedValue = result.rows[0]?.value as number;

      // 입력값과 실제 조회된 값이 다른 경우 로그 출력
      if (selectedValue !== 0) {
        ctx.ora.fail(`조회된 값 ${selectedValue}`);
      }

      await sleep(500);
    }
  }
}

export default lab2;
