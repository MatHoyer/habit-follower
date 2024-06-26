'use server';

import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { addTodoSchema } from '@/lib/validation';
import { revalidatePath } from 'next/cache';
import { ZodError } from 'zod';

type TFormState = { message: string } | undefined;

export const addTodo = async (prevState: TFormState, formData: FormData): Promise<TFormState> => {
  try {
    const session = await auth();
    if (!session?.user?.id) throw new Error('User not found');

    const data = Object.fromEntries(formData.entries());
    const { name } = addTodoSchema.parse(data);

    const todos = await prisma.todo.findMany({
      where: {
        ownerId: session.user.id,
      },
    });

    if (todos.length > 10) throw new Error('Too much todos');

    await prisma.todo.create({
      data: {
        name,
        ownerId: session.user.id,
        days: { create: {} },
      },
    });

    revalidatePath('/');
  } catch (error) {
    if (error instanceof ZodError)
      return {
        message: error.errors[0].message,
      };
    else if (error instanceof Error)
      return {
        message: error.message,
      };
    return { message: 'Error' };
  }
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
