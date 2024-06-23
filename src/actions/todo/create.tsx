'use server';
import prisma from '@/lib/prisma';
import jwt from 'jsonwebtoken';

const createTodo = async (token: string, todoName: string) => {
  const decodedToken = jwt.decode(token) as TToken;
  if (!decodedToken) throw new Error('Empty token');
  const { id } = decodedToken;

  const todo = await prisma.todo.create({
    data: {
      name: todoName,
      ownerId: id,
    },
  });

  await prisma.valid.create({
    data: {
      todoId: todo.id,
    },
  });

  return {
    todo,
  };
};

export default createTodo;
