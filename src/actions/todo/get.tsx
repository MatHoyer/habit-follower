'use server';
import prisma from '@/lib/prisma';
import jwt from 'jsonwebtoken';

export const getTodo = async (token: string, todoName: string) => {
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

  return todo;
};

export const getAllTodos = async (token: string) => {
  const decodedToken = jwt.decode(token) as TToken;
  if (!decodedToken) throw new Error('Empty token');
  const { name } = decodedToken;

  const user = await prisma.user.findUnique({
    where: { name },
    include: { createdTodos: { include: { isDone: true } } },
  });

  if (!user) throw new Error('User not found');

  return user.createdTodos;
};
