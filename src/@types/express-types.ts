import { NextFunction, Request, Response } from 'express';
import { JwtPayload } from 'jsonwebtoken';

export type TExpressMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => void;
export type ExpressErrorController = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => void;

export type Error = {
  message: string;
  data: {};
  statusCode: number;
};

export interface CustomRequest extends Request {
  token: string | JwtPayload;
}
