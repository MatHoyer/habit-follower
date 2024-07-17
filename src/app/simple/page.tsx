import { LoginButton } from '@/components/AuthButton';
import { useSimpleTodos } from '@/components/hook/useTodos';
import SimpleTodoTable from '@/components/SimpleTodoTable';
import { auth } from '@/lib/auth';
import { cn } from '@/lib/utils';

const SimpleTodos = async () => {
  const session = await auth();
  const todos = await useSimpleTodos();

  return (
    <div
      className={cn(
        'container max-w-5xl my-10 space-y-10 px-3',
        !session?.user && 'flex justify-center items-center h-screen my-0'
      )}
    >
      {session?.user ? <SimpleTodoTable todos={todos} /> : <LoginButton />}
    </div>
  );
};

export default SimpleTodos;
