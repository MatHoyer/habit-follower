'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const AuthLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem('auth')) {
      router.push('/');
    }
  }, []);

  return <div className="flex h-screen">{children}</div>;
};

export default AuthLayout;
