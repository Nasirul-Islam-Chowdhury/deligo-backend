"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middleWares/validateRequest"));
const auth_controller_1 = require("./auth.controller");
const auth_validatioin_1 = require("./auth.validatioin");
const auth_1 = __importDefault(require("../../middleWares/auth"));
const router = express_1.default.Router();
router.post('/login', (0, validateRequest_1.default)(auth_validatioin_1.AuthValidation.loginZodSchema), auth_controller_1.AuthController.loginUser);
router.post('/refresh-token', (0, validateRequest_1.default)(auth_validatioin_1.AuthValidation.refreshTokenZodSchema), auth_controller_1.AuthController.refreshToken);
router.post('/change-password', (0, validateRequest_1.default)(auth_validatioin_1.AuthValidation.changePasswordZodSchema), (0, auth_1.default)(), auth_controller_1.AuthController.changePassword);
router.post('/forgot-password', (0, validateRequest_1.default)(auth_validatioin_1.AuthValidation.forgotPasswordZodSchema), auth_controller_1.AuthController.forgotPass);
router.post('/reset-password', (0, validateRequest_1.default)(auth_validatioin_1.AuthValidation.resetPasswordZodSchema), auth_controller_1.AuthController.resetPassword);
exports.AuthRoutes = router;
