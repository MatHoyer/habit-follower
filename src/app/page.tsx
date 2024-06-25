import { LoginButton } from '@/components/AuthButton';
import { TodoTable } from '@/components/TodoTable';
import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { cn } from '@/lib/utils';

const Home = async () => {
  const session = await auth();
  const todos = await prisma.todo.findMany({
    where: {
      ownerId: session?.user?.id,
    },
    include: {
      days: true,
    },
  });

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

export default Home;
