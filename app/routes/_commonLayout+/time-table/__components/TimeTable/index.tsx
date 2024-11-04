import { Fragment, type ReactNode } from "react";

enum WeekDays {
  Mon = "月",
  Tue = "火",
  Wed = "水",
  Thu = "木",
  Fri = "金",
  Sat = "土",
}

// TODO: 時間ではなくコマに変更する
const TIME_SLOTS = Array.from({ length: 8 }, (_, i) => `${i.toString()}`);

// TODO: propsで注入してもらう
const events = [
  {
    id: 1,
    title: "Team Meeting",
    day: "Mon",
    start: 10,
    duration: 2,
    color: "bg-blue-200",
  },
  {
    id: 2,
    title: "Project Review",
    day: "Wed",
    start: 14,
    duration: 1,
    color: "bg-green-200",
  },
  {
    id: 3,
    title: "Client Call",
    day: "Thu",
    start: 11,
    duration: 1,
    color: "bg-yellow-200",
  },
  {
    id: 4,
    title: "Lunch Break",
    day: "Fri",
    start: 12,
    duration: 1,
    color: "bg-red-200",
  },
];

export function TimeTable() {
  return (
    <div className="p-4 border-2 border-solid border-border rounded-lg">
      <div className="overflow-x-auto">
        <div className="inline-block min-w-full">
          <div className="grid grid-cols-6 items-center">
            <DayOfWeek />
            {TIME_SLOTS.map((time) => (
              <Fragment key={time}>
                <UnitHeader time={time} />
                {Object.entries(WeekDays).map(([key, value]) => (
                  <TimeSlot key={`${time}-${key}`}>
                    <Class event={null} />
                  </TimeSlot>
                ))}
              </Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Class({ event }: any) {
  return (
    <div
      // TODO: 授業用のコンポーネントを作成する
      className={
        "absolute left-0 top-0 right-0 p-1 text-xs overflow-hidden h-[100%]"
      }
    >
      {/* {event.title} */}
    </div>
  );
}

function TimeSlot({ children }: { children: ReactNode }) {
  return (
    <div className="border-t border-l h-20 relative cursor-pointer">
      {children}
    </div>
  );
}

function UnitHeader({ time }: { time: string }) {
  return (
    <div className="sticky left-0 z-10 text-right pr-2 text-sm text-muted-foreground">
      {time}
    </div>
  );
}

function DayOfWeek() {
  return (
    <>
      <div className="sticky left-0 z-10"></div>
      {Object.entries(WeekDays).map(([key, value]) => (
        <div key={key} className="font-medium p-2 text-center">
          {value}
        </div>
      ))}
    </>
  );
}
