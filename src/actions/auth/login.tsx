'use server';

import prisma from '@/lib/prisma';
import { compareSync } from 'bcryptjs';
import jwt from 'jsonwebtoken';

const login = async (name: string, password: string) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const user = await prisma.user.findUnique({
    where: { name },
  });

  if (!user) throw new Error('User not found');
  if (!compareSync(password, user.password)) throw new Error('Wrong password');

  const secretKey = process.env.SECRET_JWT_KEY;
  if (!secretKey) throw new Error('Server error');
  const { password: _, ...userWithoutPassword } = user;
  const token = jwt.sign(
    {
      ...userWithoutPassword,
      exp: Date.now() + 1000 * 60 * 60 * 24 * 30,
    },
    secretKey
  );

  return {
    ...userWithoutPassword,
    token,
  };
};

export default login;
