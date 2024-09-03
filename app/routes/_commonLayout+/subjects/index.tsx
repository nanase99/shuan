import { SubjectCard } from "@/components/features/subjects";
import { subject } from "@/db/schemas";
import { getSubjects } from "@/models";
import { getAuth } from "@clerk/remix/ssr.server";
import { type LoaderFunctionArgs, json, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export const loader = async (args: LoaderFunctionArgs) => {
  const { userId } = await getAuth(args);
  if (!userId) {
    return redirect("/sign-in");
  }

  const res = await fetch("http://localhost:5173/subjects");
  if (!res.ok) {
    throw new Response("Not Found", { status: 404 });
  }
  return json({ subjects: await res.json() });
};

export default function Index() {
  const { subjects } = useLoaderData<typeof loader>();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {subjects.map((subject: any) => (
        <SubjectCard key={subject.id} subject={subject} />
      ))}
    </div>
  );
}
