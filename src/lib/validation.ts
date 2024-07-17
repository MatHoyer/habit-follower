import { z } from 'zod';

export const addTodoSchema = z.object({
  name: z.string().min(1, 'Name too short').max(15, 'Name too long'),
});

export const addSimpleTodoSchema = z.object({
  name: z.string().min(1, 'Name too short').max(64, 'Name too long'),
});

export type TAddTodoForm = z.infer<typeof addTodoSchema>;

export const removeTodoSchema = z.object({
  id: z.string(),
});

export const toggleTodoSchema = z.object({
  id: z.string(),
});

export const changeColorSchema = z.object({
  id: z.string(),
  color: z.string(),
});
