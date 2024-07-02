import { Day, Todo } from '@prisma/client';

declare global {
  type TTodo = Todo & { days: Day[] };
  type TData<T> = T | { message: string };

  type TFormState<T = unknown> = {
    data?: TData<T>;
    serverError?: string;
    fetchError?: string;
    validationErrors?: Record<string, string[] | undefined> | undefined;
  };
}
