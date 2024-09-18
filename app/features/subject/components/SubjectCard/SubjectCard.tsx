import { Trash2 } from "lucide-react";
import { Fragment, useState } from "react";

import {
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  Input,
  Label,
} from "@/features/common/components/ui";
import type { SubjectDto } from "@/features/subject/domain/dto";

export type SubjectCardProps = {
  subject: any;
};

export function SubjectCard({ subject }: SubjectCardProps) {
  const [isEdit, setIsEdit] = useState(false);
  const handleEdit = () => setIsEdit(true);
  const handleSave = () => {
    setIsEdit(false);
  };

  return (
    <Card className="bg-orange-100 relative">
      <Button
        variant="outline"
        size="sm"
        className="absolute right-2 top-2 bg-transparent hover:bg-white/40 focus:outline-white/30"
      >
        <Trash2 className="size-6" />
      </Button>
      {isEdit ? (
        <EditMode subject={subject} onSaveClick={handleSave} />
      ) : (
        <ViewMode subject={subject} onEditClick={handleEdit} />
      )}
    </Card>
  );
}

function ViewMode({
  subject: { subjectName, courses },
  onEditClick,
}: { subject: SubjectDto; onEditClick: () => void }) {
  return (
    <>
      <CardHeader className="flex-row items-center justify-between">
        <CardTitle>{subjectName}</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-2">
        <Label>単元</Label>
        <Label>時数</Label>
        {courses?.map((course) => (
          <Fragment key={course.id}>
            <p> {course.courseName}</p>
            <p>{course.classHours}</p>
          </Fragment>
        ))}
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button onClick={onEditClick}>編集</Button>
      </CardFooter>
    </>
  );
}

function EditMode({
  subject: { subjectName, courses },
  onSaveClick,
}: { subject: SubjectDto; onSaveClick: () => void }) {
  return (
    <>
      <CardHeader className="flex-row items-center justify-between">
        <CardTitle>{subjectName}</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-2">
        <Label>単元</Label>
        <Label>時数</Label>
        {courses?.map((course) => (
          <Fragment key={course.id}>
            <Input defaultValue={course.courseName} />
            <Input type="number" defaultValue={course.classHours} min={0} />
          </Fragment>
        ))}
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button onClick={onSaveClick}>保存</Button>
      </CardFooter>
    </>
  );
}
