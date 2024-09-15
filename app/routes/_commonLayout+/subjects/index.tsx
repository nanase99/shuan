import { json } from "@remix-run/node";

import { diContainer } from "@/features/common/libs";
import { SubjectCard } from "@/features/subject/components";

const getSubjectUseCase = diContainer.getSubjectUseCase();
const { useGetSubjects, executePrefetch } = getSubjectUseCase;

export const loader = async () => {
  const res = await executePrefetch();
  return json(res);
};

export default function Index() {
  const { data } = useGetSubjects();

  console.log(data);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {data?.subjects.map((subject) => {
        return <SubjectCard key={subject.id} subject={subject} />;
      })}
    </div>
  );
}
