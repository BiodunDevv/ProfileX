import jwt from 'jsonwebtoken';

type JWTPayload = {
  userId: string;
  email: string;
  iat?: number;
  exp?: number;
};

export const signJWT = (payload: JWTPayload): Promise<string> => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      process.env.ACCESS_TOKEN_SECRET!,
      { expiresIn: '1d' },
      (err, token) => {
        if (err) reject(err);
        resolve(token!);
      }
    );
  });
};

export const verifyJWT = (token: string): Promise<JWTPayload | null> => {
  return new Promise((resolve) => {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!, (err, decoded) => {
      if (err) {
        console.error('JWT verification error:', err);
        resolve(null);
      } else {
        resolve(decoded as JWTPayload);
      }
    });
  });
};