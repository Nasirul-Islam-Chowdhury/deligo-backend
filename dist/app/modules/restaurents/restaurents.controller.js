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
exports.RestaurentController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const restaurents_service_1 = require("./restaurents.service");
const createRestaurent = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const files = req.files;
    const result = yield restaurents_service_1.RestaurentService.createRestaurent(req.body, files);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Restaurent created successfully!",
        data: result,
    });
}));
const getAllRestaurents = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield restaurents_service_1.RestaurentService.getAllRestaurents();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Restaurent retrieved successfully!",
        data: result,
    });
}));
const getSingleRestaurent = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield restaurents_service_1.RestaurentService.getSingleRestaurent(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Restaurent retrieved successfully!",
        data: result,
    });
}));
const updateRestaurent = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield restaurents_service_1.RestaurentService.updateRestaurent(id, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Restaurent updated successfully!",
        data: result,
    });
}));
const addMenuItem = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params; // restaurant id
    const result = yield restaurents_service_1.RestaurentService.addMenuItem(id, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Menu item added successfully!",
        data: result,
    });
}));
const updateMenuItem = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, itemId } = req.params;
    const result = yield restaurents_service_1.RestaurentService.updateMenuItem(id, itemId, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Menu item updated successfully!",
        data: result,
    });
}));
const deleteMenuItem = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, itemId } = req.params;
    const result = yield restaurents_service_1.RestaurentService.deleteMenuItem(id, itemId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Menu item removed successfully!",
        data: result,
    });
}));
exports.RestaurentController = {
    createRestaurent,
    getSingleRestaurent,
    updateRestaurent,
    addMenuItem,
    updateMenuItem,
    deleteMenuItem,
    getAllRestaurents
};
