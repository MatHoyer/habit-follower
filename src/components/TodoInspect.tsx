'use client';
import { DateString, capitalize, getDateAsString } from '@/lib/utils';
import { Day } from '@prisma/client';
import { useRouter } from 'next/navigation';
import CheckCard from './CheckCard';
import { Button } from './ui/button';

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
                    <CheckCard
                      key={day.id}
                      isDone={day.isDone}
                      text={getDateAsString(day.createdAt, 'eeee dd' as DateString)}
                    />
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
