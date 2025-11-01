import AppError from '../../Error/Apperror';
import { User } from '../User/User.mole';
import { TloginUser } from './Auth.interface';
import httpStatus from 'http-status';
import { createToken } from './Auth.utils';
import config from '../../config';

const loginUser = async (payload: TloginUser) => {
  const { email, password } = payload;

  // Check if the email exists
  const existingUser = await User.findOne({ email });
  if (!existingUser) {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      'User with this email does not exist.',
    );
  }
  console.log(existingUser);

  const isBlocked = existingUser.isBlocked; // Replace with bcrypt.compare if hashed
  if (isBlocked) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'User is blocked.');
  }

  //   password match

  console.log("password",existingUser.password);


  if (!(await User.isPasswordMatch(password, existingUser.password))) {
    throw new AppError(httpStatus.FORBIDDEN, 'Incorrect password.');
  }

  const JwtPayload = {
    email: existingUser.email,
    role: existingUser.role as string,
    passwordChangeAt : existingUser?.passwordChangeAt
  };

  const token = createToken(
    JwtPayload,
    config.JWT_ACCESS_TOCEN as string,
    config.JWT_EXPIRE_IN_ACCESSTOKEN as string,
  );

  return {
    token,
  };
};

export const authServices = {
  loginUser,
};
