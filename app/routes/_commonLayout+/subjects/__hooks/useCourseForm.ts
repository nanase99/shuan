import { useCallback } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";

import { genUuid } from "@/features/common/libs";
import type { CourseDto } from "@/features/subject/domain/dto";
import { CourseTag } from "@/features/subject/domain/models";
import type { SubjectsSchemaType } from "./useSubjectsForm";

export function useCourseForm(subjectIndex: number) {
  const { control, getValues } = useFormContext<SubjectsSchemaType>();

  const { fields: courseFields, append } = useFieldArray({
    control: control,
    name: `subjects.${subjectIndex}.courses`,
  });

  const handleAddCourse = useCallback(() => {
    const subject = getValues(`subjects.${subjectIndex}`);
    const newCourse: CourseDto = {
      id: genUuid(),
      subjectId: subject.id,
      courseName: "",
      classHours: 0,
      progress: 0,
      tag: CourseTag.Uncompleted,
    };
    append(newCourse);
  }, [subjectIndex, getValues, append]);

  return {
    courseFields,
    handleAddCourse,
  };
}
