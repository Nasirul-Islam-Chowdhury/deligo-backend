import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../config';
import ApiError from '../../errors/ApiError';
import { jwtHelpers } from '../../helper/jwtHelpers';

const auth =
  (...requiredRoles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      //get authorization token
      const token = req.headers.authorization;
      if (!token) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized');
      }
      // verify token
      let verifiedUser = null;

      verifiedUser = jwtHelpers.verifyToken(token, config.jwt.secret as Secret);

      req.user = verifiedUser; // userid

      if (requiredRoles.length && verifiedUser && (verifiedUser as any).role) {
        const userRole = (verifiedUser as any).role as string;
        const isAllowed = requiredRoles.includes(userRole);
        if (!isAllowed) {
          throw new ApiError(httpStatus.FORBIDDEN, 'Forbidden: insufficient role');
        }
      }

      next();
    } catch (error) {
      next(error);
    }
  };

export default auth;