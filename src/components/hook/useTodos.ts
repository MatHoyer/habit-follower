import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';

export const useTodos = async () => {
  const session = await auth();
  const todos = await prisma.todo.findMany({
    where: {
      ownerId: session?.user?.id,
    },
    include: {
      days: true,
    },
    orderBy: { id: 'asc' },
  });
  return todos;
};

export const useSimpleTodos = async () => {
  const session = await auth();
  const todos = await prisma.simpleTodo.findMany({
    where: {
      ownerId: session?.user?.id,
    },
    orderBy: { id: 'asc' },
  });
  return todos;
};

export const useTodo = async (id: number) => {
  const session = await auth();
  const todo = await prisma.todo.findUnique({
    where: {
      id,
      ownerId: session?.user?.id,
    },
    include: {
      days: { orderBy: { createdAt: 'asc' } },
    },
  });

  if (!todo) return notFound();

  return todo;
};
