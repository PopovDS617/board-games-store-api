import { JwtPayload } from 'jsonwebtoken';
import { TExpressMiddleware } from '../@types/express-types';
import { IToken } from '../@types/token';
import validateToken from '../utils/validate-token';

export const isAuth: TExpressMiddleware = (req, res, next) => {
  const authHeader = req.get('Authorization');
  if (!authHeader) {
    throw new Error('not authenticated');
  }

  const token = authHeader?.split(' ')[1];

  let decodedToken;
  try {
    decodedToken = validateToken(token!);
  } catch (err: any) {
    err.statusCode = 401;
    err.message = 'jwt is not valid';
    throw err;
  }
  if (!decodedToken) {
    const error = new Error('Not authenticated');
    res.status(401);
    throw error;
  }

  req.body.userId = decodedToken.id;
  next();
};
