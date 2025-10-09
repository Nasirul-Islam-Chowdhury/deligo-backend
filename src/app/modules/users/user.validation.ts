import { z } from 'zod';
import { USER_ROLE } from '../../../enums/user';

const createUserZodSchema = z.object({
  body: z.object({
    email: z
      .string({
        required_error: 'Email is required',
      })
      .email('Invalid email format'),
    password: z
      .string({
        required_error: 'Password is required',
      })
      .min(6, 'Password must be at least 6 characters'),
    role: z.nativeEnum(USER_ROLE).optional(),
  }),
});

const createAdminZodSchema = z.object({
  body: z.object({
    name: z
      .string({
        required_error: 'Name is required',
      })
   ,
    email: z
      .string({
        required_error: 'Email is required',
      })
      .email('Invalid email format'),
    password: z
      .string({
        required_error: 'Password is required',
      })
      .min(6, 'Password must be at least 6 characters'),
  }),
});

export const UserValidation = {
  createUserZodSchema,
  createAdminZodSchema,
};