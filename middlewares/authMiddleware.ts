// middleware/authMiddleware.ts
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import Agent from '../models/agent'; // adjust path if needed

interface AuthRequest extends Request {
  agent?: any; // you can define more strict types
}

export const protect = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);

    const agent = await Agent.findById(decoded.id).select('-password');
    if (!agent) {
      return res.status(401).json({ message: 'Unauthorized: Invalid agent' });
    }

    req.agent = agent;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized: Token failed' });
  }
};
