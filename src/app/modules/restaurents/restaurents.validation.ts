import { z } from 'zod';
import mongoose from 'mongoose';



const createRestaurantZodSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Restaurant name is required',
    }),
    cuisineType: z.string({
      required_error: 'Cuisine type is required',
    }),
    images: z.array(z.string()).optional(),
    deliveryTime: z.string({
      required_error: 'Delivery time is required',
    }),
    menus: z
    .array(
      z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
        message: 'Invalid menu ID',
      })
    )
    .optional(),
  }),
});



const updateRestaurantZodSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    cuisineType: z.string().optional(),
    deliveryTime: z.string().optional(),
    menus: z
      .array(
        z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
          message: 'Invalid menu ID',
        })
      )
      .optional(),
  }),
});



export const RestaurentValidation = {
  createRestaurantZodSchema,
  updateRestaurantZodSchema
};
