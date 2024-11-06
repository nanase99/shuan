import { valibotResolver } from "@hookform/resolvers/valibot";
import { useCallback } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import * as v from "valibot";

import { RowState } from "@/features/common/enums";
import { genUuid } from "@/features/common/libs";
import type { SubjectDto } from "@/features/subject/domain/dto";
import { SubjectTag } from "@/features/subject/domain/models";
import { useSaveSubject } from "@/features/subject/fetch/fetchPostSubject";

export type SubjectsSchemaType = v.InferInput<typeof subjectsSchema>;
export type SubjectSchemaType = v.InferInput<typeof subjectSchema>;
export type CourseSchemaType = v.InferInput<typeof courseSchema>;

export function useSubjectsForm(argSubjects: SubjectDto[] = []) {
  const { mutate } = useSaveSubject();

  const convertedSubjects = argSubjects?.map((subject) => ({
    ...subject,
    classHours: subject.classHours.toString(),
    courses: subject.courses.map((course) => ({
      ...course,
      classHours: course.classHours.toString(),
      rowState: RowState.Unchanged,
    })),
  }));

  const form = useForm<SubjectsSchemaType>({
    mode: "onTouched",
    resolver: valibotResolver(subjectsSchema),
    values: { subjects: convertedSubjects },
  });

  const { fields: subjectFields, append } = useFieldArray({
    control: form.control,
    name: "subjects",
  });

  const handleSave = useCallback(
    async (index: number) => {
      const validateRes = await form.trigger(`subjects.${index}`);
      const data = v.safeParse(
        subjectSchema,
        form.getValues(`subjects.${index}`),
      );

      if (!validateRes || !data.success) return false;

      const res = await mutate(data.output);

      return false;
    },
    [form, mutate],
  );

  const handleAddSubject = useCallback(() => {
    const newSubject: SubjectSchemaType = {
      id: genUuid(),
      subjectName: "",
      classHours: "0",
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

const courseSchema = v.pipe(
  v.object({
    id: v.string(),
    subjectId: v.string(),
    courseName: v.pipe(
      v.string(),
      v.nonEmpty("単元名を入力してください"),
      v.maxLength(10, "単元名は10文字以下で入力してください"),
    ),
    classHours: v.pipe(v.string(), v.nonEmpty("科目名を入力してください")),
    progress: v.number(),
    tag: v.string(),
    rowState: v.enum(RowState),
  }),
  v.transform((data) => ({
    ...data,
    classHours: Number.parseInt(data.classHours),
  })),
);

const subjectSchema = v.pipe(
  v.object({
    id: v.string(),
    subjectName: v.pipe(
      v.string(),
      v.nonEmpty("科目名を入力してください"),
      v.maxLength(10, "科目名は10文字以下で入力してください"),
    ),
    classHours: v.pipe(v.string(), v.nonEmpty("科目名を入力してください")),
    progress: v.number(),
    tag: v.string(),
    courses: v.array(courseSchema),
  }),
  v.transform((data) => ({
    ...data,
    classHours: Number.parseInt(data.classHours),
  })),
);

const subjectsSchema = v.object({
  subjects: v.array(subjectSchema),
});
