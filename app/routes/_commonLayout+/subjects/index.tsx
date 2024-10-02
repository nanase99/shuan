import { json } from "@remix-run/cloudflare";

import { AddButton, Form } from "@/features/common/components/ui";
import { fetchGetSubjects } from "@/features/subject/fetch/fetchGetSubjects";
import { SubjectCard } from "./__SubjectCard";
import { useSubjectsForm } from "./__hooks/useSubjectsForm";

const { useGetSubjects, prefetchGetSubjects } = fetchGetSubjects();

export const loader = async () => {
  const res = await prefetchGetSubjects();
  return json(res);
};

export default function Index() {
  const { data } = useGetSubjects();
  const { form, subjectFields, handleSave, handleAddSubject } =
    useSubjectsForm(data);

  return (
    <Form {...form}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {subjectFields.map((field, index) => (
          <SubjectCard
            key={field.id}
            index={index}
            subject={field}
            onSave={handleSave}
            isView
          />
        ))}
        <div className="grid place-items-center">
          <AddButton type="button" onClick={handleAddSubject} />
        </div>
      </div>
    </Form>
  );
}
