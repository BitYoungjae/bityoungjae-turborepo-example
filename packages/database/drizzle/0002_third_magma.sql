ALTER TABLE "test2" DROP CONSTRAINT "test2_id_value_unique";--> statement-breakpoint
ALTER TABLE "test2" ADD COLUMN "key" text NOT NULL;--> statement-breakpoint
ALTER TABLE "test2" ADD CONSTRAINT "test2_key_value_unique" UNIQUE("key","value");