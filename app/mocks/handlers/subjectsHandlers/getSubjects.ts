import type { SelectSubject } from "@/db/schemas";
import { http, HttpResponse } from "msw";

export const getSubjects = http.get("/subjects", () =>
  HttpResponse.json(subjects),
);

const subjects: SelectSubject[] = [
  {
    id: "3539fc2e-c005-49bc-a12a-91bd4745e1a4",
    subjectName: "国語",
    classHours: 10,
  },
  {
    id: "a43728a6-7dc6-43bc-a73c-668418106980",
    subjectName: "算数",
    classHours: 25,
  },
];
