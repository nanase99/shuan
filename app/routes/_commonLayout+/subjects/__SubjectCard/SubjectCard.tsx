import { useState } from "react";

import type { SubjectDto } from "@/features/subject/domain/dto";
import { EditSubjectCard } from "./EditSubjectCard";
import { ViewSubjectCard } from "./ViewSubjectCard";

type Props = {
  subject: SubjectDto;
  index: number;
  isView?: boolean;
  onSave: (index: number) => Promise<boolean>;
};

export function SubjectCard({
  subject,
  index,
  isView: defaultIsView,
  onSave,
}: Props) {
  const [isView, setIsView] = useState(defaultIsView);
  const handleEdit = () => setIsView(false);
  const handleSave = async () => {
    const result = await onSave(index);
    if (result) setIsView(true);
  };

  return isView ? (
    <ViewSubjectCard subject={subject} onEditClick={handleEdit} />
  ) : (
    <EditSubjectCard subjectIndex={index} onSave={handleSave} />
  );
}
