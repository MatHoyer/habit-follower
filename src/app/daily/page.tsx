import { LoginButton } from '@/components/AuthButton';
import { useTodos } from '@/components/hook/useTodos';
import { TodoTable } from '@/components/TodoTable';
import { auth } from '@/lib/auth';
import { cn } from '@/lib/utils';

const DailyTodos = async () => {
  const session = await auth();
  const todos = await useTodos();

  return (
    <div
      className={cn(
        'container max-w-5xl my-10 space-y-10 px-3',
        !session?.user && 'flex justify-center items-center h-screen my-0'
      )}
    >
      {session?.user ? <TodoTable todos={todos} /> : <LoginButton />}
    </div>
  );
};

export default DailyTodos;
