CREATE TABLE IF NOT EXISTS "courses" (
	"id" uuid PRIMARY KEY NOT NULL,
	"subject_id" uuid NOT NULL,
	"course_name" varchar(10) NOT NULL,
	"class_hours" integer NOT NULL,
	"progress" integer NOT NULL,
	"tag" varchar(20) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "subjects" (
	"id" uuid PRIMARY KEY NOT NULL,
	"subject_name" varchar(10) NOT NULL,
	"class_hours" integer NOT NULL,
	"progress" integer NOT NULL,
	"tag" varchar(20) NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "courses" ADD CONSTRAINT "courses_subject_id_subjects_id_fk" FOREIGN KEY ("subject_id") REFERENCES "public"."subjects"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
