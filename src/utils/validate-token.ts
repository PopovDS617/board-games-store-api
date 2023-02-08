import jwt from 'jsonwebtoken';

const validateToken = (token: string) => {
  return jwt.verify(token, process.env.JWT_SECRET as string);
};

export default validateToken;
