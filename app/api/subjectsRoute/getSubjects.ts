import { Hono } from "hono";

export const getSubjects = new Hono().get("/", async (c) => {
  // TODO: DBからの取得処理を実装する
  return c.json({ test: "test" });
});

export const mockGetSubjects = new Hono().get("/", (c) => {
  return c.json({
    subject: [
      {
        id: "3539fc2e-c005-49bc-a12a-91bd4745e1a4",
        subjectName: "国語",
        classHours: 10,
        units: [
          {
            id: "efa1a443-8c2e-4325-9da1-b90abede639a",
            unitName: "おおきなかぶ",
            classHours: 5,
          },
          {
            id: "d55a6dfc-97f7-43e1-9b45-995c8bf50de5",
            unitName: "ポプラの木",
            classHours: 6,
          },
        ],
      },
      {
        id: "a43728a6-7dc6-43bc-a73c-668418106980",
        subjectName: "算数",
        classHours: 25,
        units: [
          {
            id: "b98a99f9-6e7d-4d04-acbe-91cf314ec87e",
            unitName: "足し算",
            classHours: 3,
          },
          {
            id: "31f1f3b3-77cf-45fe-a578-99165b303d7b",
            unitName: "引き算",
            classHours: 5,
          },
        ],
      },
    ],
  });
});
