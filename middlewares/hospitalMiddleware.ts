// middleware/hospitalAuthMiddleware.ts
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import Hospital from '../models/hospital'; // adjust the path if needed

interface AuthRequest extends Request {
  hospital?: any; // Optionally, use a strict Hospital type
}

export const hospitalProtect = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);

    const hospital = await Hospital.findById(decoded.id).select('-password');
    if (!hospital) {
      return res.status(401).json({ message: 'Unauthorized: Invalid hospital' });
    }

    req.hospital = hospital;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized: Token failed' });
  }
};
