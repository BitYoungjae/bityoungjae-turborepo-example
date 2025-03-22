ALTER TABLE "test2" DROP CONSTRAINT "test2_key_value_unique";--> statement-breakpoint
CREATE UNIQUE INDEX "test2_unique_key_value" ON "test2" USING btree ("key","value") WHERE "test2"."value" = 0;