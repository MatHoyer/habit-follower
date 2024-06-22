import prisma from '@/lib/prisma';
import { compareSync } from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';
import { z } from 'zod';

const loginSchema = z.object({
  name: z.string(),
  password: z.string(),
});

export const POST = async (req: Request) => {
  try {
    const data = await req.json();
    const validatedData = loginSchema.parse(data);
    const { name, password } = validatedData;

    const user = await prisma.user.findUnique({
      where: { name },
    });

    if (!user) throw new Error('User not found');
    if (!compareSync(password, user.password)) throw new Error('Wrong password');

    const secretKey = process.env.SECRET_JWT_KEY;
    if (!secretKey) throw new Error('No JWT key set');
    const { password: _, ...userWithoutPassword } = user;
    const token = jwt.sign(
      {
        ...userWithoutPassword,
        exp: Date.now() + 1000 * 60 * 60 * 24 * 30,
      },
      secretKey
    );

    return NextResponse.json({
      data: {
        ...userWithoutPassword,
        token,
      },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ message: 'Login failed', errors: error.errors });
    }
    return NextResponse.json({ message: 'Server error', error: error });
  }
};
