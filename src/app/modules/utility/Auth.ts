import jwt, { JwtPayload } from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import { TuserRole } from '../User/User.interface';
import config from '../../config';
import AppError from '../../Error/Apperror';
import { User } from '../User/User.mole';
import httpStatus from 'http-status';
import catchAsync from './catchAsync';

const auth = (...requiredRoles: TuserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'User is not authorized');
    }
    //   validation token
    const decoded = jwt.verify(
      token,
      config.JWT_ACCESS_TOCEN as string,
    ) as JwtPayload;
    if (!decoded) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'User is not authorized');
    }
    console.log(decoded);
    const { email, role, iat } = decoded;

    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'User is not authorized');
    }

    if (user.passwordChangeAt) {
      // Date → milliseconds → seconds → number
      const passwordChangeTimestamp: number = Math.floor(
        new Date(user.passwordChangeAt).getTime() / 1000,
      );

      if (Number(passwordChangeTimestamp) > Number(iat)) {
        throw new AppError(
          httpStatus.UNAUTHORIZED,
          'User recently changed password. Please login again.',
        );
      }
    }

    console.log(user);

    //   check is blocked user
    if (user.isBlocked) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'Your User is Blocked!');
    }
    //   role check
    // Check for required roles
    if (requiredRoles && !requiredRoles?.includes(role)) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        'User does not have the required permissions',
      );
    }
    req.user = decoded;

    next();
  });
};

export default auth;
