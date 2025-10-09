"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderValidation = void 0;
const zod_1 = require("zod");
const createOrderZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        customerName: zod_1.z.string({
            required_error: "Customer name is required",
        }),
        restaurantId: zod_1.z.string({
            required_error: "Restaurant ID is required",
        }),
        items: zod_1.z.array(zod_1.z.object({
            name: zod_1.z.string({
                required_error: "Item name is required",
            }),
            price: zod_1.z.number({
                required_error: "Item price is required",
            }).positive("Price must be positive"),
            quantity: zod_1.z.number({
                required_error: "Item quantity is required",
            }).int().positive("Quantity must be a positive integer").default(1),
        })).min(1, "At least one item is required"),
        totalAmount: zod_1.z.number({
            required_error: "Total amount is required",
        }).positive("Total amount must be positive"),
        estimatedDelivery: zod_1.z.string({
            required_error: "Estimated delivery is required",
        }),
    }),
});
exports.OrderValidation = {
    createOrderZodSchema,
};
