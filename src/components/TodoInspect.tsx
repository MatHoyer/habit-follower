'use client';
import { DateString, getDateAsString } from '@/lib/utils';
import { Day } from '@prisma/client';
import { Check, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from './ui/button';

const sortDaysByYear = (days: Day[]) => {
  const yearMap = new Map<number, Day[]>();

  for (const day of days) {
    const year = day.createdAt.getFullYear();
    const data = yearMap.get(year);
    if (data) yearMap.set(year, [...data, day]);
    else yearMap.set(year, [day]);
  }

  const obj = Array.from(yearMap.entries()).map(([year, days]) => ({
    year,
    days,
  }));

  return obj;
};

export const TodoInspect: React.FC<{ todo: TTodo }> = ({ todo }) => {
  const router = useRouter();

  const sortedDays = sortDaysByYear(todo.days);

  return (
    <div className="flex gap-5">
      <div className="sticky top-16 h-fit rounded-lg border bg-background px-4 py-4 md:w-[150px] flex justify-center">
        <Button onClick={() => router.back()}>Go back</Button>
      </div>
      <div className="flex flex-col gap-10">
        {sortedDays.map((year) => (
          <div key={year.year} className="flex flex-col gap-5">
            <div className="text-3xl">{year.year}</div>
            <div className="grid grid-cols-5 gap-4">
              {year.days.map((day) => (
                <div
                  key={day.id}
                  className="flex flex-col items-center justify-center rounded-lg border bg-background px-4 py-4 w-40"
                >
                  <div>{day.isDone ? <Check color="green" /> : <X color="red" />}</div>
                  <div>{getDateAsString(day.createdAt, DateString.lDate)}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
