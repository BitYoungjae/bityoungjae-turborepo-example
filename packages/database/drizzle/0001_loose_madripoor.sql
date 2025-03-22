CREATE TABLE "test2" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "test2_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"value" integer DEFAULT 0 NOT NULL,
	CONSTRAINT "test2_id_value_unique" UNIQUE("id","value")
);
