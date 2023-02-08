// import {
//   TExpressMiddleware,
//   ExpressErrorController,
// } from '../types/express-types';

// export const notFound: TExpressMiddleware = (req, res, next) => {
//   const error = new Error(`Not Found - ${req.originalUrl}`);
//   res.status(404);
//   next(error);
// };

// export const errorHandler: ExpressErrorController = (error, req, res, next) => {
//   console.log(error);
//   const status = error.statusCode || 500;
//   const message = error.message;
//   const data = error.data;
//   res.status(status).json({ message: message, data: data });
//   // const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
//   // res.status(statusCode);
//   // res.json({
//   //   message: err.message,
//   //   //stack: process.env.NODE_ENV === 'production' ? null : err.stack,
//   // });
// };
