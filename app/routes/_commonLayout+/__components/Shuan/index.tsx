import { useState } from "react";
import { ShuanHeader } from "./ShuanHeader";

// TODO: 表記を変える
const WEEK_DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

// TODO: 時間ではなくコマに変更する
const TIME_SLOTS = Array.from(
  { length: 24 },
  (_, i) => `${i.toString().padStart(2, "0")}:00`,
);

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

export function Shuan() {
  // TODO: 外部から注入してもらう
  const [currentWeek, setCurrentWeek] = useState(new Date());

  return (
    <div className="p-4 border-2 border-solid border-border rounded-lg">
      <ShuanHeader currentWeek={currentWeek} />
      <div className="overflow-x-auto">
        <div className="inline-block min-w-full">
          <div className="grid grid-cols-8">
            <div className="sticky left-0 z-10"></div>
            {WEEK_DAYS.map((day) => (
              <div key={day} className="font-medium p-2">
                {day}
              </div>
            ))}
            {/* TODO: timeslot用のコンポーネントを作成する */}
            {TIME_SLOTS.map((time) => (
              <>
                <div
                  key={time}
                  className="sticky left-0 z-10 text-right pr-2 text-sm text-muted-foreground"
                >
                  {time}
                </div>
                {WEEK_DAYS.map((day) => {
                  const event = events.find(
                    (e) =>
                      e.day === day &&
                      e.start === Number.parseInt(time.split(":")[0]),
                  );
                  return (
                    <div
                      key={`${day}-${time}`}
                      className="border-t border-l h-12 relative"
                    >
                      {event && (
                        <div
                          // TODO: 授業用のコンポーネントを作成する
                          className={`absolute left-0 top-0 right-0 ${event.color} p-1 text-xs overflow-hidden h-[100%]`}
                        >
                          {event.title}
                        </div>
                      )}
                    </div>
                  );
                })}
              </>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
