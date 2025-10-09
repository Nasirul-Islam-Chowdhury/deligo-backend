"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestaurentValidation = void 0;
const zod_1 = require("zod");
const mongoose_1 = __importDefault(require("mongoose"));
const createRestaurantZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: 'Restaurant name is required',
        }),
        cuisineType: zod_1.z.string({
            required_error: 'Cuisine type is required',
        }),
        images: zod_1.z.array(zod_1.z.string()).optional(),
        deliveryTime: zod_1.z.string({
            required_error: 'Delivery time is required',
        }),
        menus: zod_1.z
            .array(zod_1.z.string().refine((val) => mongoose_1.default.Types.ObjectId.isValid(val), {
            message: 'Invalid menu ID',
        }))
            .optional(),
    }),
});
const updateRestaurantZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().optional(),
        cuisineType: zod_1.z.string().optional(),
        deliveryTime: zod_1.z.string().optional(),
        menus: zod_1.z
            .array(zod_1.z.string().refine((val) => mongoose_1.default.Types.ObjectId.isValid(val), {
            message: 'Invalid menu ID',
        }))
            .optional(),
    }),
});
exports.RestaurentValidation = {
    createRestaurantZodSchema,
    updateRestaurantZodSchema
};
