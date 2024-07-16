'use client';

import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { capitalize, DateString, getDateAsString } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { Button } from './ui/button';

const getConfig = (todos: TTodo[]) => {
  const config = {} as ChartConfig;
  for (const [index, todo] of todos.entries()) {
    config[todo.name] = {
      label: todo.name,
      color: todo.color,
    };
  }
  return config;
};

const getData = (todos: TTodo[]) => {
  const lastMonthsTodos = todos.map((todo) => {
    const currentDate = new Date();
    currentDate.setMonth(currentDate.getMonth() - 5);
    return {
      ...todo,
      days: todo.days.filter((day) => {
        const dayDate = new Date(day.createdAt);
        return dayDate >= currentDate;
      }),
    };
  });

  const todosByMonth = lastMonthsTodos.map((todo) => {
    const data: {
      [key: string]: number;
    } = {};
    for (let i = 4; i >= 0; i--) {
      const today = new Date();
      today.setMonth(today.getMonth() - i);

      let count = 0;
      for (const day of todo.days) {
        if (day.createdAt.getMonth() === today.getMonth() && day.isDone) count++;
      }

      data[capitalize(getDateAsString(today, 'MMMM' as DateString))] = count;
    }

    return { name: todo.name, data };
  });

  const months = [];
  for (let i = 4; i >= 0; i--) {
    const today = new Date();
    today.setMonth(today.getMonth() - i);
    months.push({
      month: capitalize(getDateAsString(today, 'MMMM' as DateString)),
    });
  }

  const chartData = months.map((row) => {
    let newRow = { month: row.month };
    for (const todo of todosByMonth) {
      newRow = { ...newRow, [todo.name]: todo.data[row.month] };
    }
    return newRow;
  });

  return chartData;
};

export const StatChart: React.FC<{ todos: TTodo[] }> = ({ todos }) => {
  const router = useRouter();

  const chartConfig = getConfig(todos);
  const chartData = getData(todos);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Todos stats</CardTitle>
        <CardDescription>5 last month</CardDescription>
        <div className="flex gap-3">
          {chartData.map((data, index) => (
            <Button
              key={index}
              variant={'ghost'}
              onClick={() => {
                router.push(`/date/${new Date().getFullYear()}/${data.month.toLocaleLowerCase()}`);
              }}
            >
              {data.month}
            </Button>
          ))}
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => (value.lenght > 7 ? value.slice(0, 4) : value)}
            />
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <ChartLegend content={<ChartLegendContent />} />
            {todos.map((todo) => (
              <Bar
                key={todo.name}
                dataKey={todo.name}
                stackId="a"
                fill={`var(--color-${todo.name})`}
                radius={[0, 0, 0, 0]} // Rounded corner left top, ... and right bot
              />
            ))}
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm"></CardFooter>
    </Card>
  );
};
