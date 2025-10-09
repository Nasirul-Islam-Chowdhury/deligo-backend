"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.join(process.cwd(), ".env") });
exports.default = {
    env: process.env.NODE_ENV,
    port: process.env.PORT,
    database_url: process.env.DATABASE_URL,
    bycrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
    default_user_pass: process.env.DEFAULT_USER_PASS,
    admin_seed_email: process.env.ADMIN_SEED_EMAIL,
    admin_seed_password: process.env.ADMIN_SEED_PASSWORD,
    jwt: {
        secret: process.env.JWT_SECRET,
        refresh_secret: process.env.JWT_REFRESH_SECRET,
        expires_in: process.env.JWT_EXPIRES_IN,
        refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN,
    },
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
    reset_link: process.env.RESET_LINK,
    app_pass: process.env.APP_PASS,
    email: process.env.EMAIL,
};
