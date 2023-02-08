import { NextFunction, Request, Response } from 'express';

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

type Error = {
  message: string;
  data: {};
  statusCode: number;
};
