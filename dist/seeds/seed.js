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
exports.seedAdmin = void 0;
const user_model_1 = require("../app/modules/users/user.model");
const config_1 = __importDefault(require("../config"));
const user_1 = require("../enums/user");
const seedAdmin = () => __awaiter(void 0, void 0, void 0, function* () {
    const email = config_1.default.admin_seed_email;
    const password = config_1.default.admin_seed_password;
    const exists = yield user_model_1.User.findOne({ email });
    if (exists) {
        return;
    }
    yield user_model_1.User.create({
        email,
        password,
        role: user_1.USER_ROLE.ADMIN,
        needsPasswordChange: false,
        status: 'in-progress',
        isDeleted: false,
    });
});
exports.seedAdmin = seedAdmin;
