import { SubjectCard } from "@/components/features/subjects";
import { apiClient } from "@/libs";
import { getAuth } from "@clerk/remix/ssr.server";
import { type LoaderFunctionArgs, json, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useEffect } from "react";

// export const loader = async (args: LoaderFunctionArgs) => {
//   // const res = await apiClient.api.subjects.$get();
//   // if (!res.ok) {
//   //   throw new Response("Not Found", { status: 404 });
//   // }
//   // return json({ subjects: await res.json() });
// };

export default function Index() {
  // const { subjects } = useLoaderData<typeof loader>();
  useEffect(() => {
    const fetcher = async () => {
      const res = await fetch("http://localhost:5173/api/subjects");
      if (res.ok) console.log(await res.json());
    };
    fetcher();
  }, []);
  // console.log(subjects);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {/* {subjects.map((subject: any) => (
        <SubjectCard key={subject.id} subject={subject} />
      ))} */}
    </div>
  );
}
