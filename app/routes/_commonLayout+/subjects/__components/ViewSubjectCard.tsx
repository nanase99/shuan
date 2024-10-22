import {
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  Label,
  Typography,
} from "@/features/common/components/ui";
import type { SubjectDto } from "@/features/subject/domain/dto";
import { Fragment } from "react/jsx-runtime";

type Props = { subject: SubjectDto; onEditClick: () => void };

export function ViewSubjectCard({ subject, onEditClick }: Props) {
  return (
    <Card className="bg-orange-100 relative">
      <CardHeader className="flex-row items-center justify-between">
        <CardTitle className="flex w-full">
          <Typography>{subject.subjectName}</Typography>
        </CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-2">
        <Label className="font-semibold">単元</Label>
        <Label className="font-semibold">時数</Label>
        {subject.courses?.map((course) => (
          <Fragment key={course.id}>
            <p className="py-2 px-3"> {course.courseName}</p>
            <p className="py-2 px-3">{course.classHours}</p>
          </Fragment>
        ))}
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button onClick={onEditClick}>編集</Button>
      </CardFooter>
    </Card>
  );
}
