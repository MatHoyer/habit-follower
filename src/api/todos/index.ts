import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';

const prisma = new PrismaClient();

const todoSchema = z.object({});

const handle = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
  }
};

export default handle;
