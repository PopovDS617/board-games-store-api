import { JwtPayload } from 'jsonwebtoken';
import { TExpressMiddleware } from '../@types/express-types';
import { IToken } from '../@types/token';
import validateToken from '../utils/validate-token';

export const isAuth: TExpressMiddleware = (req, res, next) => {
  const token = req.get('Authorization')?.split('')[1];
  let decodedToken: JwtPayload | string;
  try {
    decodedToken = validateToken(token!);
  } catch (err) {
    throw err;
  }
  if (!decodedToken) {
    const error = new Error('Not authenticated');
    throw error;
  }

  req.userId = decodedToken.id;
  next();
};
