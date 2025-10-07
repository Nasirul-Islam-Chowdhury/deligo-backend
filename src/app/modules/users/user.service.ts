import httpStatus from 'http-status';
import mongoose from 'mongoose';
import config from '../../../config/index';
import ApiError from '../../../errors/ApiError';
import { IUser } from './user.interface';
import { User } from './user.model';
import { USER_ROLE } from '../../../enums/user';

const createUser = async (userData: IUser): Promise<IUser | null> => {

  let newUserAllData = null;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const newUser = await User.create([userData], { session });

    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }
    newUserAllData = newUser[0];

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }

  if (newUserAllData) {
    newUserAllData = await User.findById(newUserAllData._id);
  }

  return newUserAllData;
};

export const UserService = {
  createUser,
  async createAdmin(userData: Pick<IUser, 'email' | 'password'>): Promise<IUser | null> {
    const payload: IUser = {
      email: userData.email,
      password: userData.password,
      role: USER_ROLE.ADMIN,
      needsPasswordChange: false,
      status: 'in-progress',
      isDeleted: false,
    } as IUser;
    const created = await createUser(payload);
    return created;
  },
};