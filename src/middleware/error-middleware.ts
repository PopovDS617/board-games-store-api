import {
  TExpressMiddleware,
  ExpressErrorController,
} from '../@types/express-types';

export const notFound: TExpressMiddleware = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

export const errorHandler: ExpressErrorController = (error, req, res, next) => {
  //   const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(error.statusCode);
  res.json({
    message: error.message,
    //stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};
