'use client';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const Home = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem('auth')) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <div className="flex flex-col justify-center items-center gap-3">
      {isAuthenticated ? (
        <>
          Logged
          <Button
            onClick={() => {
              localStorage.removeItem('auth');
              location.reload();
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
