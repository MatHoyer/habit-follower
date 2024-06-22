import prisma from '@/lib/prisma';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';
import { z } from 'zod';

const getTodosSchema = z.object({
  token: z.string(),
  todo: z.object({ name: z.string() }),
});

export const GET = async (req: Request) => {
  try {
    const data = await req.json();
    const validatedData = getTodosSchema.parse(data);
    const { token, todo: wantedTodo } = validatedData;

    const decodedToken = jwt.decode(token) as TToken;
    if (!decodedToken) throw new Error('Empty token');
    const { id } = decodedToken;

    const todo = await prisma.todo.findFirst({
      where: {
        name: wantedTodo.name,
        ownerId: id,
      },
      include: {
        isDone: true,
      },
    });

    console.log(todo);

    return NextResponse.json({ todo });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ message: 'Get failed', errors: error.errors });
    }
    return NextResponse.json({ message: 'Server error', error: error });
  }
};

const postTodosSchema = z.object({
  token: z.string(),
  todo: z.object({ name: z.string() }),
});

export const POST = async (req: Request) => {
  try {
    const data = await req.json();
    const validatedData = postTodosSchema.parse(data);
    const { token, todo: wantedTodo } = validatedData;

    const decodedToken = jwt.decode(token) as TToken;
    if (!decodedToken) throw new Error('Empty token');
    const { id } = decodedToken;

    const todo = await prisma.todo.create({
      data: {
        name: wantedTodo.name,
        ownerId: id,
      },
    });

    await prisma.valid.create({
      data: {
        todoId: todo.id,
      },
    });

    return NextResponse.json({ message: `Todo ${todo.name} created` });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ message: 'Creation failed', errors: error.errors });
    }
    return NextResponse.json({ message: 'Server error', error: error });
  }
};
