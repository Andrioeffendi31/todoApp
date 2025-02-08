import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';

declare module 'express' {
  export interface Request {
    user?: any;
  }
}

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (token) {
    const decoded = verifyToken(token);
    if (decoded) {
      req.user = decoded;
      return next();
    }
  }
  res.status(401).json({ message: 'Unauthorized' });
};