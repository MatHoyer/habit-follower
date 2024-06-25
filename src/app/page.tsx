import { LoginButton, LogoutButton } from '@/components/AuthButton';
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
    <div className={cn('flex flex-col items-center gap-3 h-screen', !session?.user && 'justify-center')}>
      {session?.user ? (
        <div>
          <TodoTable todos={todos} />
          <LogoutButton />
        </div>
      ) : (
        <LoginButton />
      )}
    </div>
  );
};

export default Home;
