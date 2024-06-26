import { z } from 'zod';

export const addTodoSchema = z.object({
  name: z.string().min(1, 'Name too short').max(15, 'Name too long'),
});

export type TAddTodoForm = z.infer<typeof addTodoSchema>;
