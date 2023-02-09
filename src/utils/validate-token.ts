import jwt, { JwtPayload } from 'jsonwebtoken';

const validateToken = (token: string) => {
  return jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
};

export default validateToken;
