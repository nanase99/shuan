import { Button } from "@/features/common/components/ui";
import { ChevronLeft, ChevronRight } from "lucide-react";

function formatWeekRange(date: Date) {
  const startDate = new Date(date);
  const endDate = new Date(date);
  startDate.setDate(date.getDate() - date.getDay() + 1);
  endDate.setDate(date.getDate() - date.getDay() + 7);
  return `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`;
}

type Props = { currentWeek: Date };

// TODO: デザインを整える
// TODO: ボタン押下時の処理を外部から注入する
export function ShuanHeader({ currentWeek }: Props) {
  return (
    <div className="flex items-center justify-between mb-4">
      <span className="text-2xl font-bold">Schedule</span>
      <div className="flex items-center space-x-2">
        <Button variant="ghost" className="p-2">
          <ChevronLeft />
        </Button>
        <span className="font-medium">{formatWeekRange(currentWeek)}</span>
        <Button variant="ghost" className="p-2">
          <ChevronRight />
        </Button>
      </div>
    </div>
  );
}
