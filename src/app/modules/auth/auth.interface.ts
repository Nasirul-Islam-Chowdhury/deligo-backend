export type ILoginUser = {
    email: string;
    password: string;
};
export type TLoginUser = {
    email: string;
    password: string;
  };

export type ILoginUserResponse = {
    accessToken: string;
    refreshToken?: string;
    needPasswordChange: boolean;
    role?: string;
};

export type IRefreshTokenResponse = {
    accessToken: string;
};

export type IVerifiedLoginUser = {
    userId: string;
    role?: string;
};

export type IChangePassword = {
    oldPassword: string;
    newPassword: string;
};