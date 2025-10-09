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
exports.OrderService = void 0;
const mongoose_1 = require("mongoose");
const orders_model_1 = require("./orders.model");
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const createOrder = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const created = yield orders_model_1.Order.create(Object.assign(Object.assign({}, payload), { restaurantId: new mongoose_1.Types.ObjectId(payload.restaurantId), userId: new mongoose_1.Types.ObjectId(payload.userId) }));
    return created.toObject();
});
const getOrderById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield orders_model_1.Order.findById(id)
        .populate("restaurantId", "name address")
        .populate("userId", "name email")
        .lean();
    if (!order) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Order not found");
    }
    return order;
});
const getMyOrders = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const orders = yield orders_model_1.Order.find({
        userId: new mongoose_1.Types.ObjectId(userId),
        status: { $ne: "cancelled" }
    })
        .populate("restaurantId", "name address")
        .sort({ createdAt: -1 })
        .lean();
    return orders;
});
const cancelOrder = (orderId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield orders_model_1.Order.findOne({
        _id: new mongoose_1.Types.ObjectId(orderId),
        userId: new mongoose_1.Types.ObjectId(userId),
    });
    if (!order) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Order not found");
    }
    if (order.status === "cancelled") {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Order is already cancelled");
    }
    if (order.status === "delivered") {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Cannot cancel a delivered order");
    }
    order.status = "cancelled";
    yield order.save();
    return order.toObject();
});
exports.OrderService = {
    createOrder,
    getOrderById,
    getMyOrders,
    cancelOrder,
};
