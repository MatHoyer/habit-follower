import { LoginButton, LogoutButton } from '@/components/AuthButton';
import { TodoTable } from '@/components/TodoTable';
import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';

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
    <div className="flex flex-col justify-center items-center gap-3 h-screen">
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
