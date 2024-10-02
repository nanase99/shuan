import { valibotResolver } from "@hookform/resolvers/valibot";
import { useCallback } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import * as v from "valibot";

import { genUuid } from "@/features/common/libs";
import type { SubjectDto } from "@/features/subject/domain/dto";
import { SubjectTag } from "@/features/subject/domain/models";

export type SubjectsSchemaType = v.InferInput<typeof subjectsSchema>;
export type CourseSchemaType = v.InferInput<typeof courseSchema>;

export function useSubjectsForm(argSubject: SubjectDto[] | undefined) {
  const form = useForm<SubjectsSchemaType>({
    mode: "onTouched",
    resolver: valibotResolver(subjectsSchema),
    values: { subjects: argSubject! },
  });

  const { fields: subjectFields, append } = useFieldArray({
    control: form.control,
    name: "subjects",
  });

  const handleSave = useCallback(
    // TODO: あとで実装
    async (index: number) => {
      const validateRes = await form.trigger(`subjects.${index}`);
      // if (!validateRes) return false;

      const data = form.getValues(`subjects.${index}`);

      return false;
    },
    [form],
  );

  const handleAddSubject = useCallback(() => {
    const newSubject: v.InferInput<typeof subjectSchema> = {
      id: genUuid(),
      subjectName: "",
      classHours: 0,
      courses: [],
      progress: 0,
      tag: SubjectTag.Uncompleted,
    };

    append(newSubject);
  }, [append]);

  return {
    form,
    subjectFields,
    handleSave,
    handleAddSubject,
  };
}

const courseSchema = v.object({
  id: v.string(),
  subjectId: v.string(),
  courseName: v.pipe(
    v.string(),
    v.nonEmpty("単元名を入力してください"),
    v.maxLength(10, "単元名は10文字以下で入力してください"),
  ),
  classHours: v.pipe(
    v.number(),
    v.integer(),
    v.minValue(1, "時数は1以上で入力してください"),
  ),
  progress: v.number(),
  tag: v.string(),
});

const subjectSchema = v.object({
  id: v.string(),
  subjectName: v.pipe(
    v.string(),
    v.nonEmpty("科目名を入力してください"),
    v.maxLength(10, "科目名は10文字以下で入力してください"),
  ),
  classHours: v.pipe(
    v.number(),
    v.integer(),
    v.minValue(1, "時数は1以上で入力してください"),
  ),
  progress: v.number(),
  tag: v.string(),
  courses: v.array(courseSchema),
});

const subjectsSchema = v.object({
  subjects: v.array(subjectSchema),
});
