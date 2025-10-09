"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middleWares/validateRequest"));
const auth_1 = __importDefault(require("../../middleWares/auth"));
const orders_controller_1 = require("./orders.controller");
const orders_validation_1 = require("./orders.validation");
const user_1 = require("../../../enums/user");
const router = express_1.default.Router();
router.post("/", (0, auth_1.default)(user_1.USER_ROLE.CUSTOMER), (0, validateRequest_1.default)(orders_validation_1.OrderValidation.createOrderZodSchema), orders_controller_1.OrderController.createOrder);
router.get("/my-orders", (0, auth_1.default)(user_1.USER_ROLE.CUSTOMER), orders_controller_1.OrderController.getMyOrders);
router.get("/:id", orders_controller_1.OrderController.getOrder);
router.patch("/:id/cancel", (0, auth_1.default)(user_1.USER_ROLE.CUSTOMER), orders_controller_1.OrderController.cancelOrder);
exports.orderRoutes = router;
