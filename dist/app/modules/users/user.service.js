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
exports.UserService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const mongoose_1 = __importDefault(require("mongoose"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const user_model_1 = require("./user.model");
const user_1 = require("../../../enums/user");
const createUser = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    let newUserAllData = null;
    const session = yield mongoose_1.default.startSession();
    // Check if user already exists by email
    const existingUser = yield user_model_1.User.findOne({ email: userData.email }).session(session);
    if (existingUser) {
        yield session.endSession();
        throw new ApiError_1.default(http_status_1.default.CONFLICT, 'User already exists');
    }
    try {
        session.startTransaction();
        const newUser = yield user_model_1.User.create([userData], { session });
        if (!newUser.length) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to create user');
        }
        newUserAllData = newUser[0];
        yield session.commitTransaction();
        yield session.endSession();
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        throw error;
    }
    if (newUserAllData) {
        newUserAllData = yield user_model_1.User.findById(newUserAllData._id);
    }
    return newUserAllData;
});
exports.UserService = {
    createUser,
    createAdmin(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            const payload = {
                email: userData.email,
                password: userData.password,
                role: user_1.USER_ROLE.ADMIN,
                needsPasswordChange: false,
                status: 'in-progress',
                isDeleted: false,
            };
            const created = yield createUser(payload);
            return created;
        });
    },
};
