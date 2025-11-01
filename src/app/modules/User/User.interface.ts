import { Model } from 'mongoose';
import { userRole } from './User.const';

export interface TUser {
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  profileImage: string;
  passwordChangeAt?: string;
  role?: 'admin' | 'user';
  isBlocked: boolean;
}

export interface UserModel extends Model<TUser> {
  isPasswordMatch(password: string, hasPassword: string): Promise<boolean>;
  isUserExistsById(email: string): Promise<TUser>;
}

export type TuserRole = keyof typeof userRole;
