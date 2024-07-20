import { useTodos } from '@/components/hook/useTodos';
import { MonthInspect } from '@/components/todos/daily/MonthInspect';

const Month: React.FC<{ params: { year: string; month: string } }> = async ({ params }) => {
  const todos = await useTodos();

  return (
    <div className="container max-w-5xl my-10 space-y-10 px-3">
      <MonthInspect todos={todos} date={params} />
    </div>
  );
};

export default Month;
