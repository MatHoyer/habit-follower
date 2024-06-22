import prisma from '@/lib/prisma';
import { hashSync } from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';
import { z } from 'zod';

const signUpSchema = z.object({
  name: z.string(),
  password: z.string(),
});

export const POST = async (req: Request) => {
  try {
    const data = await req.json();
    const validatedData = signUpSchema.parse(data);
    const { name, password } = validatedData;
    const hashedPassword = hashSync(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        password: hashedPassword,
      },
    });

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
      return NextResponse.json({ message: 'Sign up failed', errors: error.errors });
    }
    return NextResponse.json({ message: 'Server error', error: error });
  }
};
