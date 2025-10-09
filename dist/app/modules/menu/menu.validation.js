"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenuValidation = void 0;
const zod_1 = require("zod");
const menuItemSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: "Menu item name is required",
        }),
        price: zod_1.z.preprocess((val) => {
            if (typeof val === "string" || typeof val === "number") {
                const num = Number(val);
                return isNaN(num) ? val : num;
            }
            return val;
        }, zod_1.z
            .number({
            required_error: "Price is required",
        })
            .positive("Price must be a positive number")),
        images: zod_1.z.array(zod_1.z.string()).optional(),
        description: zod_1.z.string().optional(),
    }),
});
exports.MenuValidation = {
    createMenuZodSchema: menuItemSchema,
};
