import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface TokenPayload {
  sub: string; 
  iat: number;
  exp: number;
}

export function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Token missing' });
  }

  // separo o bearer
  const [, token] = authHeader.split(' ');

  try {
    // verifico token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'web2mtgrande');

    const { sub } = decoded as TokenPayload;

    // salvo o usuario na req
    req.userId = sub;

    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Token invalid' });
  }
}