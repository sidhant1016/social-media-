import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload }from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
interface CustomRequest extends Request {
    user?: JwtPayload;
  }

export default function (req: CustomRequest, res: Response, next: NextFunction) {
    try {
        const jwtToken = req.header('token');

        // If no token returned, decline authorization
        if (!jwtToken) {
            return res.status(403).json('Not authorized');
        }

      
        
    // verify token, get user id
    const payload = jwt.verify(jwtToken, process.env.jwtSecret as string);

    if (typeof payload === 'string') {
      throw new Error('Invalid token');
    }

    req.user = payload as JwtPayload;


        next();
    } catch (err) {
        return res.status(403).json('Not authorized');
    }
};
