import { Trash2 } from "lucide-react";
import { useState } from "react";

import { Button, Card } from "@/components/features/common/ui";

export type SubjectCardProps = {
  subject: any;
};

type Mode = "view" | "edit";

export function SubjectCard({ subject }: SubjectCardProps) {
  const [mode, setMode] = useState<Mode>("view");

  return (
    <Card className="bg-orange-100 relative">
      <Button
        variant="outline"
        size="sm"
        className="absolute right-2 top-2 bg-transparent hover:bg-white/40 focus:outline-white/30"
      >
        <Trash2 className="size-6" />
      </Button>
      {/* {mode === "view" ? (
        <ViewMode subject={subject} />
      ) : (
        <EditMode subject={subject} />
      )} */}
    </Card>
  );
}

// function ViewMode({ subject: { subjectName, units } }: { subject: Subject }) {
//   return (
//     <>
//       <CardHeader className="flex-row items-center justify-between">
//         <CardTitle>{subjectName}</CardTitle>
//       </CardHeader>
//       <CardContent className="grid grid-cols-2 gap-2">
//         <Label>単元</Label>
//         <Label>時数</Label>
//         {units?.map((unit) => (
//           <Fragment key={unit.id}>
//             <Input defaultValue={unit.unitName} />
//             <Input type="number" defaultValue={unit.classHours} min={0} />
//           </Fragment>
//         ))}
//       </CardContent>
//       <CardFooter className="flex justify-end">
//         <Button>編集</Button>
//       </CardFooter>
//     </>
//   );
// }

// function EditMode({ subject: { subjectName, units } }: { subject: Subject }) {
//   return (
//     <>
//       <CardHeader className="flex-row items-center justify-between">
//         <CardTitle>{subjectName}</CardTitle>
//       </CardHeader>
//       <CardContent className="grid grid-cols-2 gap-2">
//         <Label>単元</Label>
//         <Label>時数</Label>
//         {units?.map((unit) => (
//           <Fragment key={unit.id}>
//             <Input defaultValue={unit.unitName} />
//             <Input type="number" defaultValue={unit.classHours} min={0} />
//           </Fragment>
//         ))}
//       </CardContent>
//       <CardFooter className="flex justify-end">
//         <Button>編集</Button>
//       </CardFooter>
//     </>
//   );
// }
