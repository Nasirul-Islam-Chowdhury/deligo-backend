import bcrypt from "bcrypt";
import httpStatus from "http-status";
import jwt, { JwtPayload } from "jsonwebtoken";
import ApiError from "../../../errors/ApiError";
import { User } from "../users/user.model";
import { USER_ROLE } from "../../../enums/user";
import { TLoginUser } from "./auth.interface";
import { jwtHelpers } from "../../../helper/jwtHelpers";
import config from "../../../config";
import { sendEmail } from "./sendResetMail";


const loginUser = async (payload: TLoginUser) => {
  const user = await User.isUserExistsByEmail(payload.email);


  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "This user is not found !");
  }

  const isDeleted = user?.isDeleted;

  if (isDeleted) {
    throw new ApiError(httpStatus.FORBIDDEN, "This user is deleted !");
  }


  const userStatus = user?.status;

  if (userStatus === "blocked") {
    throw new ApiError(httpStatus.FORBIDDEN, "This user is blocked ! !");
  }


  if (!(await User.isPasswordMatched(payload?.password, user?.password)))
    throw new ApiError(httpStatus.FORBIDDEN, "Password do not matched");


  const jwtPayload = {
    userId: user._id,
    role: (user as any).role as USER_ROLE,
  };

  const accessToken = jwtHelpers.createToken(
    jwtPayload,
    config.jwt.secret as string,
    config.jwt.expires_in as string
  );

  const refreshToken = jwtHelpers.createToken(
    jwtPayload,
    config.jwt.refresh_secret as string,
  config.jwt.refresh_expires_in
  );

  return {
    accessToken,
    refreshToken,
    needsPasswordChange: user?.needsPasswordChange,
    // compatibility for callers expecting `needPasswordChange`
    needPasswordChange: user?.needsPasswordChange,
    role: (user as any).role as USER_ROLE,
  };
};

const changePassword = async (
  userData: JwtPayload,
  payload: { oldPassword: string; newPassword: string }
) => {
  const user = await User.findById(userData.userId).select('+password');

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "This user is not found !");
  }

  const isDeleted = user?.isDeleted;

  if (isDeleted) {
    throw new ApiError(httpStatus.FORBIDDEN, "This user is deleted !");
  }


  const userStatus = user?.status;

  if (userStatus === "blocked") {
    throw new ApiError(httpStatus.FORBIDDEN, "This user is blocked ! !");
  }


  if (!(await User.isPasswordMatched(payload.oldPassword, user?.password)))
    throw new ApiError(httpStatus.FORBIDDEN, "Password do not matched");

  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bycrypt_salt_rounds)
  );

  await User.findByIdAndUpdate(
    userData.userId,
    {
      password: newHashedPassword,
      needsPasswordChange: false,
      passwordChangedAt: new Date(),
    }
  );

  return null;
};

const refreshToken = async (token: string) => {
  const decoded = jwtHelpers.verifyToken(token, config.jwt.refresh_secret as string);

  const { userId, iat } = decoded;

  const user = await User.findById(userId);

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "This user is not found !");
  }
  const isDeleted = user?.isDeleted;

  if (isDeleted) {
    throw new ApiError(httpStatus.FORBIDDEN, "This user is deleted !");
  }

  const userStatus = user?.status;

  if (userStatus === "blocked") {
    throw new ApiError(httpStatus.FORBIDDEN, "This user is blocked ! !");
  }

  if (
    user.passwordChangedAt &&
    User.isJWTIssuedBeforePasswordChanged(user.passwordChangedAt, iat as number)
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "You are not authorized !");
  }

  const jwtPayload = {
    userId: user._id,
  };

  const accessToken = jwtHelpers.createToken(
    jwtPayload,
    config.jwt.secret as string,
    config.jwt.expires_in
  );

  return {
    accessToken,
  };
};

const forgetPassword = async (email: string) => {
  // checking if the user is exist
  const user = await User.isUserExistsByEmail(email);

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "This user is not found !");
  }
  const isDeleted = user?.isDeleted;

  if (isDeleted) {
    throw new ApiError(httpStatus.FORBIDDEN, "This user is deleted !");
  }

  const userStatus = user?.status;

  if (userStatus === "blocked") {
    throw new ApiError(httpStatus.FORBIDDEN, "This user is blocked ! !");
  }

  const jwtPayload = {
    userId: user._id,
  };

  const resetToken = jwtHelpers.createToken(
    jwtPayload,
    config.jwt.secret as string,
    "10m" // 10 minutes in seconds
  );

  const resetUILink = `${config.reset_link}?id=${user._id}&token=${resetToken} `;

  sendEmail(user.email, resetUILink);

};

const resetPassword = async (
  payload: { id: string; newPassword: string },
  token: string
) => {
  // checking if the user is exist
  const user = await User.findById(payload?.id);

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "This user is not found !");
  }
  // checking if the user is already deleted
  const isDeleted = user?.isDeleted;

  if (isDeleted) {
    throw new ApiError(httpStatus.FORBIDDEN, "This user is deleted !");
  }

  // checking if the user is blocked
  const userStatus = user?.status;

  if (userStatus === "blocked") {
    throw new ApiError(httpStatus.FORBIDDEN, "This user is blocked ! !");
  }

  const decoded = jwt.verify(
    token,
    config.jwt.secret as string
  ) as JwtPayload;

  if (payload.id !== decoded.userId) {
    console.log(payload.id, decoded.userId);
    throw new ApiError(httpStatus.FORBIDDEN, "You are forbidden!");
  }

  //hash new password
  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bycrypt_salt_rounds)
  );

  await User.findByIdAndUpdate(
    decoded.userId,
    {
      password: newHashedPassword,
      needsPasswordChange: false,
      passwordChangedAt: new Date(),
    }
  );
};

export const AuthServices = {
  loginUser,
  changePassword,
  refreshToken,
  forgetPassword,
  resetPassword,
};
