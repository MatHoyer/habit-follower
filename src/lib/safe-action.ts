import { Prisma } from '@prisma/client';
import { createSafeActionClient } from 'next-safe-action';
import { auth } from './auth';

export const actionClient = createSafeActionClient({
  handleReturnedServerError: (error, utils) => {
    console.log(error);
    console.log(utils);
    if (error instanceof Prisma.PrismaClientKnownRequestError) return 'db error';
    return error.message;
  },
}).use(async ({ next }) => {
  const session = await auth();
  if (!session?.user?.id) throw new Error('Unauthorized');
  return next({ ctx: { userId: session.user.id } });
});
