CREATE TABLE IF NOT EXISTS "subjects" (
	"id" uuid PRIMARY KEY NOT NULL,
	"subject_name" varchar(10),
	"class_hours" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "units" (
	"id" uuid PRIMARY KEY NOT NULL,
	"unit_name" varchar(10),
	"class_hours" integer
);
