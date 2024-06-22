import prisma from '@/lib/prisma';
import { compareSync } from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';

const loginSchema = z.object({
  name: z.string(),
  password: z.string(),
});

const handle = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    try {
      const validatedData = loginSchema.parse(req.body);
      const { name, password } = validatedData;

      const user = await prisma.user.findUnique({
        where: { name },
      });

      if (!user) throw new Error('User not found');
      if (!compareSync(password, user.password)) throw new Error('Wrong password');

      const secretKey = process.env.SECRET_JWT_KEY;
      if (!secretKey) throw new Error('No JWT key set');
      const { password: _, ...userWithoutPassword } = user;
      const token = jwt.sign(
        {
          ...userWithoutPassword,
          exp: Date.now() + 30 * 60 * 60 * 24,
        },
        secretKey
      );

      return res.json({
        data: {
          ...userWithoutPassword,
          token,
        },
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: 'Login failed', errors: error.errors });
      }
      return res.status(500).json({ message: 'Server error', error: error });
    }
  }
};

export default handle;
