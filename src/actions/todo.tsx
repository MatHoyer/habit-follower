'use server';

import prisma from '@/lib/prisma';
import { actionClient } from '@/lib/safe-action';
import { addTodoSchema, removeTodoSchema, toggleTodoSchema } from '@/lib/validation';
import { flattenValidationErrors, returnValidationErrors } from 'next-safe-action';
import { revalidatePath } from 'next/cache';

export const addTodo = actionClient
  .schema(addTodoSchema, {
    handleValidationErrorsShape: (ve) => flattenValidationErrors(ve).fieldErrors,
  })
  .action(async ({ parsedInput: { name }, ctx }) => {
    if (name === 'etre raciste')
      returnValidationErrors(addTodoSchema, { name: { _errors: ['pas gentil detre mechant'] } });
    const todos = await prisma.todo.findMany({
      where: {
        ownerId: ctx.userId,
      },
    });

    if (todos.length > 10) throw new Error('Too much todos');

    await prisma.todo.create({
      data: {
        name,
        ownerId: ctx.userId,
        days: { create: {} },
      },
    });

    revalidatePath('/');
  });

export const removeTodo = actionClient
  .schema(removeTodoSchema, {
    handleValidationErrorsShape: (ve) => flattenValidationErrors(ve).fieldErrors,
  })
  .action(async ({ parsedInput: { id }, ctx }) => {
    await prisma.todo.delete({
      where: {
        id,
        ownerId: ctx.userId,
      },
    });

    revalidatePath('/');
  });

export const toggleTodo = actionClient
  .schema(toggleTodoSchema, {
    handleValidationErrorsShape: (ve) => flattenValidationErrors(ve).fieldErrors,
  })
  .action(async ({ parsedInput: { id }, ctx }) => {
    const day = await prisma.day.findFirst({
      where: {
        todoId: id,
        todo: { ownerId: ctx.userId },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    if (!day) throw new Error('Day not found');

    await prisma.day.update({
      where: {
        id: day.id,
      },
      data: {
        isDone: !day.isDone,
      },
    });

    revalidatePath('/');
  });
