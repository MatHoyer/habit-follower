'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { capitalize, DateString, getDateAsString } from '@/lib/utils';
import { getDaysInMonth } from 'date-fns';
import { useRouter } from 'next/navigation';
import React from 'react';
import CheckCard from './CheckCard';

const months: { [month: string]: number } = {
  janvier: 0,
  février: 1,
  mars: 2,
  avril: 3,
  mai: 4,
  juin: 5,
  juillet: 6,
  août: 7,
  septembre: 8,
  octobre: 9,
  novembre: 10,
  décembre: 11,
};

const DayCard: React.FC<{ date: Date; todos: { name: string; isDone: boolean }[] }> = ({ date, todos }) => {
  return (
    <Card>
      <CardHeader>{capitalize(getDateAsString(date, 'eeee dd' as DateString))}</CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {todos.map((todo) => (
            <CheckCard key={todo.name} isDone={todo.isDone} text={todo.name} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export const MonthInspect: React.FC<{ todos: TTodo[]; date: { year: string; month: string } }> = ({ todos, date }) => {
  const router = useRouter();
  let daysInMonth = [];

  const countDays = getDaysInMonth(new Date(Number(date.year), months[date.month]));
  for (let i = countDays; i >= 1; i--) {
    daysInMonth.push({
      date: new Date(Number(date.year), months[date.month], i),
      todos: [] as { name: string; isDone: boolean }[],
    });
  }

  for (let i = 0; i < daysInMonth.length; i++) {
    const date = daysInMonth[i].date;
    daysInMonth[i].todos = todos
      .map((todo) => {
        const result = todo.days.filter(
          (d) => getDateAsString(d.createdAt, DateString.date) === getDateAsString(date, DateString.date)
        );
        if (result.length !== 1) return { name: todo.name, isDone: undefined };
        return { name: todo.name, isDone: result[0].isDone };
      })
      .filter((d) => d.isDone !== undefined);
  }

  daysInMonth = daysInMonth.filter((day) => day.todos.length !== 0);

  return (
    <div className="flex gap-5">
      <div className="sticky top-16 h-fit rounded-lg border bg-background px-4 py-4 md:w-[150px] flex justify-center">
        <Button onClick={() => router.back()}>Go back</Button>
      </div>
      <div className="flex flex-col gap-5">
        <h1 className="text-3xl">{capitalize(date.month) + ' ' + date.year}</h1>
        {daysInMonth.map((day, index) => (
          <DayCard key={index} date={day.date} todos={day.todos} />
        ))}
      </div>
    </div>
  );
};
