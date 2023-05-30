import { NextFunction, Response, Request } from "express";
import jwt, { Secret, JwtPayload } from "jsonwebtoken";
require('dotenv').config();

interface CustomRequest extends Request {
  user?: any;
}

export default function (req: CustomRequest, res: Response, next: NextFunction) {
  try {
    const jwtToken = req.header('jwt_token');

    // If no token returned, decline authorization
    if (!jwtToken) {
      return res.status(403).json('Not authorized');
    }

    // Verify token, get user id
    const jwtSecret = process.env.jwtSecret as Secret;

    if (!jwtSecret) {
      throw new Error('JWT secret is not defined');
    }

    const payload = jwt.verify(jwtToken, jwtSecret) as JwtPayload;

    if (!payload.user) {
      throw new Error('Invalid token payload');
    }

    req.user = payload.user;

    next();
  } catch (err) {
    return res.status(403).json('Not authorized');
  }
};
