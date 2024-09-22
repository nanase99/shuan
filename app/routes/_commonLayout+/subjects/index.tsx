import { json } from "@remix-run/cloudflare";

import { SubjectCard } from "@/features/subject/components";
import { fetchGetSubjects } from "@/features/subject/fetch/fetchGetSubjects";

const { useGetSubjects, prefetchGetSubjects } = fetchGetSubjects();

export const loader = async () => {
  const res = await prefetchGetSubjects();
  return json(res);
};

export default function Index() {
  const { data } = useGetSubjects();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {data?.subjects.map((subject) => {
        return <SubjectCard key={subject.id} subject={subject} />;
      })}
    </div>
  );
}
