DROP INDEX "test2_unique_key_value";--> statement-breakpoint
CREATE UNIQUE INDEX "test2_unique_key_value" ON "test2" USING btree ("key") WHERE "test2"."value" = 0;