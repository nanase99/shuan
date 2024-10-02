import { Trash2 } from "lucide-react";
import { Fragment } from "react";

import {
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  FormInput,
  Label,
} from "@/features/common/components/ui";
import { useCourseForm } from "../__hooks/useCourseForm";

type Props = {
  subjectIndex: number;
  onSave: () => Promise<void>;
};

export function EditSubjectCard({ subjectIndex, onSave }: Props) {
  const { courseFields, handleAddCourse } = useCourseForm(subjectIndex);

  return (
    <form onSubmit={onSave}>
      <Card className="bg-orange-100 relative">
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="absolute right-6 top-8 h-fit p-0 rounded-full bg-transparent hover:bg-white/40 focus:outline-white/30 ring-offset-0 focus-visible:ring-offset-0"
        >
          <Trash2 className="size-6" />
        </Button>
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle className="flex w-full">
            <FormInput
              name={`subjects.${subjectIndex}.subjectName`}
              className="mr-8 text-2xl font-semibold border-solid border-black
                          bg-white/40"
            />
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-2">
          <Label className="font-semibold">単元</Label>
          <Label className="font-semibold">時数</Label>
          {courseFields?.map((course, courseIndex) => {
            return (
              <Fragment key={course.id}>
                <FormInput
                  name={`subjects.${subjectIndex}.courses.${courseIndex}.courseName`}
                  className="text-base border-solid border-black bg-white/40"
                />
                <FormInput
                  name={`subjects.${subjectIndex}.courses.${courseIndex}.classHours`}
                  className="text-base border-solid border-black bg-white/40"
                />
              </Fragment>
            );
          })}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button type="button" onClick={handleAddCourse}>
            追加
          </Button>
          <Button type="button" onClick={onSave}>
            保存
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
