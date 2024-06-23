'use server';

import prisma from '@/lib/prisma';
import { hashSync } from 'bcryptjs';
import jwt from 'jsonwebtoken';

const signup = async (name: string, password: string) => {
  const hashedPassword = hashSync(password, 10);

  const user = await prisma.user.create({
    data: {
      name,
      password: hashedPassword,
    },
  });

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

export default signup;
