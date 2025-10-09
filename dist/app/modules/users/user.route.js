"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middleWares/validateRequest"));
const user_controller_1 = require("./user.controller");
const user_validation_1 = require("./user.validation");
const auth_1 = __importDefault(require("../../middleWares/auth"));
const user_1 = require("../../../enums/user");
const router = express_1.default.Router();
router.post('/create-user', (0, validateRequest_1.default)(user_validation_1.UserValidation.createUserZodSchema), user_controller_1.UserController.createUser);
router.post('/create-admin', (0, auth_1.default)(user_1.USER_ROLE.ADMIN), (0, validateRequest_1.default)(user_validation_1.UserValidation.createAdminZodSchema), user_controller_1.UserController.createAdmin);
exports.userRoutes = router;
