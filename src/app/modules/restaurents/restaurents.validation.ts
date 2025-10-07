import { z } from 'zod';

const menuItemSchema = z.object({
  name: z.string({
    required_error: 'Menu item name is required',
  }),
  price: z.number({
    required_error: 'Menu item price is required',
  }),
  image: z.string().optional(),
});

const createRestaurentZodSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Restaurent name is required',
    }),
    cuisineType: z.string({
      required_error: 'Cuisine type is required',
    }),
    image: z.string().optional(),
    deliveryTime: z.string({
      required_error: 'Delivery time is required',
    }),
    menu: z.union([
      z.array(menuItemSchema),
      z.string().transform((str) => {
        try {
          return JSON.parse(str);
        } catch {
          return [];
        }
      })
    ]).optional(),
  }),
});

export const RestaurentValidation = {
  createRestaurentZodSchema,
};
