'use client';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

const Home = () => {
  const isAuthenticated = () => {
    return localStorage.getItem('auth');
  };
  const router = useRouter();

  return (
    <div className="flex flex-col justify-center items-center gap-3">
      {!!isAuthenticated() ? (
        <>
          Logged
          <Button
            onClick={() => {
              localStorage.removeItem('auth');
              router.refresh();
            }}
          >
            Disconect
          </Button>
        </>
      ) : (
        <>
          <Button onClick={() => router.push('/auth/login')}>Login</Button>
          <Button onClick={() => router.push('/auth/sign-up')}>Sign Up</Button>
        </>
      )}
    </div>
  );
};

export default Home;
