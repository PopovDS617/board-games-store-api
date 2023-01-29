import { NextFunction, Request, Response } from 'express';
import { Error } from 'mongoose';

export type ExpressController = (
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
