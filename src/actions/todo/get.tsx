'use server';
import prisma from '@/lib/prisma';
import jwt from 'jsonwebtoken';

const getTodo = async (token: string, todoName: string) => {
  const decodedToken = jwt.decode(token) as TToken;
  if (!decodedToken) throw new Error('Empty token');
  const { id } = decodedToken;

  const todo = await prisma.todo.findFirst({
    where: {
      name: todoName,
      ownerId: id,
    },
    include: {
      isDone: true,
    },
  });

  return {
    todo,
  };
};

export default getTodo;
