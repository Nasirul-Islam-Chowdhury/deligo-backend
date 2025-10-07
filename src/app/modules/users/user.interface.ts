/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose';


export type IUser = {
  _id?: string;
  email: string;
  password: string;
  needsPasswordChange: boolean;
  passwordChangedAt?: Date;
  status: 'in-progress' | 'blocked';
  isDeleted: boolean;
};

export type UserModel = {
  isUserExist(
    email: string,
  ): Promise<Pick<IUser, 'email' | 'password' | 'needsPasswordChange'> | null>;
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string,
  ): Promise<boolean>;
  isUserExistsByEmail(email: string): Promise<IUser | null>;
  isJWTIssuedBeforePasswordChanged(
    passwordChangedTimestamp: Date,
    jwtIssuedTimestamp: number,
  ): boolean;
} & Model<IUser>;


export interface TUser {
  email: string;
  password: string;
  needsPasswordChange: boolean;
  passwordChangedAt?: Date;
  status: 'in-progress' | 'blocked';
  isDeleted: boolean;
}