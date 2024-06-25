import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const GET = async () => {
  const todos = await prisma.todo.findMany();

  todos.map(async (todo) => {
    await prisma.day.create({
      data: {
        todoId: todo.id,
      },
    });
  });

  return NextResponse.json({ status: 'ok' });
};
