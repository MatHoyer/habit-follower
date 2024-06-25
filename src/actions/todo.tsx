'use server';

import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export const addTodo = async (name: string) => {
  const session = await auth();

  if (!session?.user?.id) return;

  const todo = await prisma.todo.create({
    data: {
      name,
      ownerId: session.user.id,
      days: { create: {} },
    },
  });

  revalidatePath('/');
};

export const removeTodo = async (id: string) => {
  const session = await auth();

  if (!session?.user?.id) return;

  await prisma.todo.delete({
    where: {
      id,
    },
  });

  revalidatePath('/');
};

export const toggleTodo = async (id: string) => {
  const session = await auth();

  if (!session?.user?.id) return;

  const day = await prisma.day.findFirst({
    where: {
      todoId: id,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  if (!day) return;

  await prisma.day.update({
    where: {
      id: day.id,
    },
    data: {
      isDone: !day.isDone,
    },
  });

  revalidatePath('/');
};
