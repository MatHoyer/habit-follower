import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const GET = async (request: NextRequest) => {
  const host = request.headers.get('host');

  if (host && (!host.includes('localhost') || !host.startsWith('127.0.0.1')))
    return NextResponse.json({ status: 'un authorized' });

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
