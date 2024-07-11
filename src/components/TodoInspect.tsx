'use client';
import { DateString, cn, getDateAsString } from '@/lib/utils';
import { Day } from '@prisma/client';
import { Check, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from './ui/button';

const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const getMonthString = (month: number) => {
  const date = new Date();
  date.setMonth(month);
  return capitalize(getDateAsString(date, 'MMMM' as DateString));
};

type THystory = { year: number; data: { month: number; data: Day[] }[] }[];

const sortDaysByYear = (days: Day[]) => {
  const history: { [key: string]: { [key: string]: Day[] } } = {};

  days.forEach((day) => {
    const year = day.createdAt.getFullYear().toString();
    const month = day.createdAt.getMonth();
    if (!history[year]) {
      history[year] = {};
    }
    if (!history[year][month]) {
      history[year][month] = [];
    }
    history[year][month].push(day);
  });

  const historyArray: THystory = Object.keys(history).map((year) => ({
    year: parseInt(year),
    data: Object.keys(history[year]).map((month) => ({
      month: parseInt(month),
      data: history[year][month],
    })),
  }));

  historyArray.forEach((yearObj) => {
    yearObj.data.sort((a, b) => b.month - a.month);
  });

  historyArray.sort((a, b) => b.year - a.year);

  return historyArray;
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
          <div key={year.year} className="flex flex-col gap-4">
            <div className="text-3xl">{year.year}</div>
            {year.data.map((month) => (
              <div key={month.month} className="flex flex-col gap-2">
                <div className="text-xl">{getMonthString(month.month)}</div>
                <div className="grid grid-cols-5 gap-4">
                  {month.data?.map((day) => (
                    <div
                      key={day.id}
                      className={cn(
                        'group cursor-default flex flex-col items-center justify-center rounded-lg border bg-background px-4 py-4 w-40',
                        day.isDone ? 'hover:bg-green-500 hover:text-black' : 'hover:bg-red-500'
                      )}
                    >
                      <div>
                        {day.isDone ? (
                          <Check className="text-green-500 group-hover:text-black" />
                        ) : (
                          <X className="text-red-500 group-hover:text-white" />
                        )}
                      </div>
                      <div>{getDateAsString(day.createdAt, 'eeee dd' as DateString)}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
