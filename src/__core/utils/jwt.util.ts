import jwt from 'jsonwebtoken';

interface JwtPayload {
  value: any;
  jwtSecret: string;
  jwtExpiry: string;
}
export const generateJwt = async (data: JwtPayload) => {
  return jwt.sign(data, data.jwtSecret, { expiresIn: data.jwtExpiry });
};
