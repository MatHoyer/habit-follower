'use client';

import { Button } from '@/components/ui/button';
import { signIn, signOut } from 'next-auth/react';

export const LoginButton = () => {
  return <Button onClick={() => signIn('github')}>Login with github</Button>;
};

export const LogoutButton = () => {
  return <Button onClick={() => signOut()}>Logout</Button>;
};
