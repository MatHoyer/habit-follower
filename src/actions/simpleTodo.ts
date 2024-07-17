'use server';
import prisma from '@/lib/prisma';
import { actionClient } from '@/lib/safe-action';
import { addSimpleTodoSchema, removeTodoSchema } from '@/lib/validation';
import { flattenValidationErrors } from 'next-safe-action';
import { revalidatePath } from 'next/cache';

export const addSimpleTodo = actionClient
  .schema(addSimpleTodoSchema, {
    handleValidationErrorsShape: (ve) => flattenValidationErrors(ve).fieldErrors,
  })
  .action(async ({ parsedInput: { name }, ctx }) => {
    const todos = await prisma.simpleTodo.findMany({
      where: {
        ownerId: ctx.userId,
      },
    });

    if (todos.length > 10) throw new Error('Too much todos');

    await prisma.simpleTodo.create({
      data: {
        name,
        ownerId: ctx.userId,
      },
    });

    revalidatePath('/');
  });

export const removeSimpleTodo = actionClient
  .schema(removeTodoSchema, {
    handleValidationErrorsShape: (ve) => flattenValidationErrors(ve).fieldErrors,
  })
  .action(async ({ parsedInput: { id }, ctx }) => {
    await prisma.simpleTodo.delete({
      where: {
        id,
        ownerId: ctx.userId,
      },
    });

    revalidatePath('/');
  });
