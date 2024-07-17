import { LoginButton } from '@/components/AuthButton';
import { auth } from '@/lib/auth';
import { cn } from '@/lib/utils';

const Home = async () => {
  const session = await auth();

  return (
    <div
      className={cn(
        'container max-w-5xl my-10 space-y-10 px-3',
        !session?.user && 'flex justify-center items-center h-screen my-0'
      )}
    >
      {session?.user ? (
        <div className="flex flex-col space-y-5">
          <h1 className="text-3xl">Habit Follower</h1>
          <div className="flex justify-around">
            <div className="flex flex-col items-center gap-3">
              <h2 className="text-2xl">Simple</h2>
              <p>Unique todo</p>
            </div>
            <div className="w-0 border"></div>
            <div className="flex flex-col items-center gap-3">
              <h2 className="text-2xl">Daily</h2>
              <p>Each day todo</p>
            </div>
          </div>
        </div>
      ) : (
        <LoginButton />
      )}
    </div>
  );
};

export default Home;
