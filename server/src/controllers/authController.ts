import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { generateToken } from '../utils/jwt';
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const register = async (req: Request, res: Response) => {
  const { email, password, username, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: { email, passwordHash: hashedPassword, username, role },
  });
  res.json({ token: generateToken(user.userId), username, role, userId: user.userId, email});
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });
  if (user && await bcrypt.compare(password, user.passwordHash)) {
    res.json({ token: generateToken(user.userId), username: user.username, role: user.role, userId: user.userId, email: user.email });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
};