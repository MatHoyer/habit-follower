'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const ProtectedLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    if (!localStorage.getItem('auth')) {
      router.push('/');
    }
  }, []);

  return <div>{children}</div>;
};

export default ProtectedLayout;
