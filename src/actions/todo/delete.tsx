'use server';
import prisma from '@/lib/prisma';
import jwt from 'jsonwebtoken';

const deleteTodo = async (token: string, todoName: string) => {
  const decodedToken = jwt.decode(token) as TToken;
  if (!decodedToken) throw new Error('Empty token');
  const { id } = decodedToken;

  const todo = await prisma.todo.delete({
    where: {
      name_ownerId: { name: todoName, ownerId: id },
    },
  });

  return todo;
};

export default deleteTodo;
