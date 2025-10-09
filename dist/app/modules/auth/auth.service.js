"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthServices = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const http_status_1 = __importDefault(require("http-status"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const user_model_1 = require("../users/user.model");
const jwtHelpers_1 = require("../../../helper/jwtHelpers");
const config_1 = __importDefault(require("../../../config"));
const sendResetMail_1 = require("./sendResetMail");
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // checking if the user is exist
    const user = yield user_model_1.User.isUserExistsByEmail(payload.email);
    console.log(user, "-------user");
    if (!user) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "This user is not found !");
    }
    // checking if the user is already deleted
    const isDeleted = user === null || user === void 0 ? void 0 : user.isDeleted;
    if (isDeleted) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, "This user is deleted !");
    }
    // checking if the user is blocked
    const userStatus = user === null || user === void 0 ? void 0 : user.status;
    if (userStatus === "blocked") {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, "This user is blocked ! !");
    }
    //checking if the password is correct
    if (!(yield user_model_1.User.isPasswordMatched(payload === null || payload === void 0 ? void 0 : payload.password, user === null || user === void 0 ? void 0 : user.password)))
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, "Password do not matched");
    //create token and sent to the  client
    const jwtPayload = {
        userId: user._id,
        role: user.role,
    };
    const accessToken = jwtHelpers_1.jwtHelpers.createToken(jwtPayload, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
    const refreshToken = jwtHelpers_1.jwtHelpers.createToken(jwtPayload, config_1.default.jwt.refresh_secret, config_1.default.jwt.refresh_expires_in);
    return {
        accessToken,
        refreshToken,
        needsPasswordChange: user === null || user === void 0 ? void 0 : user.needsPasswordChange,
        // compatibility for callers expecting `needPasswordChange`
        needPasswordChange: user === null || user === void 0 ? void 0 : user.needsPasswordChange,
        role: user.role,
    };
});
const changePassword = (userData, payload) => __awaiter(void 0, void 0, void 0, function* () {
    // checking if the user is exist
    const user = yield user_model_1.User.findById(userData.userId).select('+password');
    if (!user) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "This user is not found !");
    }
    // checking if the user is already deleted
    const isDeleted = user === null || user === void 0 ? void 0 : user.isDeleted;
    if (isDeleted) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, "This user is deleted !");
    }
    // checking if the user is blocked
    const userStatus = user === null || user === void 0 ? void 0 : user.status;
    if (userStatus === "blocked") {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, "This user is blocked ! !");
    }
    //checking if the password is correct
    if (!(yield user_model_1.User.isPasswordMatched(payload.oldPassword, user === null || user === void 0 ? void 0 : user.password)))
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, "Password do not matched");
    //hash new password
    const newHashedPassword = yield bcrypt_1.default.hash(payload.newPassword, Number(config_1.default.bycrypt_salt_rounds));
    yield user_model_1.User.findByIdAndUpdate(userData.userId, {
        password: newHashedPassword,
        needsPasswordChange: false,
        passwordChangedAt: new Date(),
    });
    return null;
});
const refreshToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    // checking if the given token is valid
    const decoded = jwtHelpers_1.jwtHelpers.verifyToken(token, config_1.default.jwt.refresh_secret);
    const { userId, iat } = decoded;
    // checking if the user is exist
    const user = yield user_model_1.User.findById(userId);
    if (!user) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "This user is not found !");
    }
    // checking if the user is already deleted
    const isDeleted = user === null || user === void 0 ? void 0 : user.isDeleted;
    if (isDeleted) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, "This user is deleted !");
    }
    // checking if the user is blocked
    const userStatus = user === null || user === void 0 ? void 0 : user.status;
    if (userStatus === "blocked") {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, "This user is blocked ! !");
    }
    if (user.passwordChangedAt &&
        user_model_1.User.isJWTIssuedBeforePasswordChanged(user.passwordChangedAt, iat)) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "You are not authorized !");
    }
    const jwtPayload = {
        userId: user._id,
    };
    const accessToken = jwtHelpers_1.jwtHelpers.createToken(jwtPayload, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
    return {
        accessToken,
    };
});
const forgetPassword = (email) => __awaiter(void 0, void 0, void 0, function* () {
    // checking if the user is exist
    const user = yield user_model_1.User.isUserExistsByEmail(email);
    if (!user) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "This user is not found !");
    }
    // checking if the user is already deleted
    const isDeleted = user === null || user === void 0 ? void 0 : user.isDeleted;
    if (isDeleted) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, "This user is deleted !");
    }
    // checking if the user is blocked
    const userStatus = user === null || user === void 0 ? void 0 : user.status;
    if (userStatus === "blocked") {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, "This user is blocked ! !");
    }
    const jwtPayload = {
        userId: user._id,
    };
    const resetToken = jwtHelpers_1.jwtHelpers.createToken(jwtPayload, config_1.default.jwt.secret, "10m" // 10 minutes in seconds
    );
    const resetUILink = `${config_1.default.reset_link}?id=${user._id}&token=${resetToken} `;
    (0, sendResetMail_1.sendEmail)(user.email, resetUILink);
    console.log(resetUILink);
});
const resetPassword = (payload, token) => __awaiter(void 0, void 0, void 0, function* () {
    // checking if the user is exist
    const user = yield user_model_1.User.findById(payload === null || payload === void 0 ? void 0 : payload.id);
    if (!user) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "This user is not found !");
    }
    // checking if the user is already deleted
    const isDeleted = user === null || user === void 0 ? void 0 : user.isDeleted;
    if (isDeleted) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, "This user is deleted !");
    }
    // checking if the user is blocked
    const userStatus = user === null || user === void 0 ? void 0 : user.status;
    if (userStatus === "blocked") {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, "This user is blocked ! !");
    }
    const decoded = jsonwebtoken_1.default.verify(token, config_1.default.jwt.secret);
    if (payload.id !== decoded.userId) {
        console.log(payload.id, decoded.userId);
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, "You are forbidden!");
    }
    //hash new password
    const newHashedPassword = yield bcrypt_1.default.hash(payload.newPassword, Number(config_1.default.bycrypt_salt_rounds));
    yield user_model_1.User.findByIdAndUpdate(decoded.userId, {
        password: newHashedPassword,
        needsPasswordChange: false,
        passwordChangedAt: new Date(),
    });
});
exports.AuthServices = {
    loginUser,
    changePassword,
    refreshToken,
    forgetPassword,
    resetPassword,
};
