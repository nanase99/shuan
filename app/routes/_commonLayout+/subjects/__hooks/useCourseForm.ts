import { useCallback } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";

import { RowState } from "@/features/common/enums";
import { genUuid } from "@/features/common/libs";
import { CourseTag } from "@/features/subject/domain/models";
import type { CourseSchemaType, SubjectsSchemaType } from "./useSubjectsForm";

export function useCourseForm(subjectIndex: number) {
  const { control, getValues } = useFormContext<SubjectsSchemaType>();

  const { fields: courseFields, append } = useFieldArray({
    control: control,
    name: `subjects.${subjectIndex}.courses`,
  });

  const handleAddCourse = useCallback(() => {
    const subject = getValues(`subjects.${subjectIndex}`);
    const newCourse: CourseSchemaType = {
      id: genUuid(),
      subjectId: subject.id,
      courseName: "",
      classHours: "0",
      progress: 0,
      tag: CourseTag.Uncompleted,
      rowState: RowState.Added,
    };
    append(newCourse);
  }, [subjectIndex, getValues, append]);

  return {
    courseFields,
    handleAddCourse,
  };
}
