import { Day, Todo } from '@prisma/client';

declare global {
  type TTodo = Todo & { days: Day[] };
}
