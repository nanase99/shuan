import { SubjectCard } from "@/components/subjects";
import { getSubjectUseCase } from "@/useCases";
import { json } from "@remix-run/node";

const { useGetSubjects, executePrefetch } = getSubjectUseCase;

export const loader = async () => {
  const res = await executePrefetch();
  return json(res);
};

export default function Index() {
  const { data, isPending } = useGetSubjects();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {/* {data?.subjects?.map((subject) => subject.id)} */}
      {/* {subjects.map((subject: any) => (
        <SubjectCard key={subject.id} subject={subject} />
      ))} */}
    </div>
  );
}
