"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
const zod_1 = require("zod");
const user_1 = require("../../../enums/user");
const createUserZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z
            .string({
            required_error: 'Email is required',
        })
            .email('Invalid email format'),
        password: zod_1.z
            .string({
            required_error: 'Password is required',
        })
            .min(6, 'Password must be at least 6 characters'),
        role: zod_1.z.nativeEnum(user_1.USER_ROLE).optional(),
    }),
});
const createAdminZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z
            .string({
            required_error: 'Name is required',
        }),
        email: zod_1.z
            .string({
            required_error: 'Email is required',
        })
            .email('Invalid email format'),
        password: zod_1.z
            .string({
            required_error: 'Password is required',
        })
            .min(6, 'Password must be at least 6 characters'),
    }),
});
exports.UserValidation = {
    createUserZodSchema,
    createAdminZodSchema,
};
