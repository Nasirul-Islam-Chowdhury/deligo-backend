import { z } from "zod";

const orderItemSchema = z.object({
  name: z.string({ required_error: "item name is required" }),
  price: z.number({ required_error: "item price is required" }),
});

const createOrderZodSchema = z.object({
  body: z.object({
    customerName: z.string().optional(),
    restaurantId: z.string({ required_error: "restaurantId is required" }),
    items: z.array(orderItemSchema).min(1, "at least one item is required"),
    totalAmount: z.number({ required_error: "totalAmount is required" }),
    estimatedDelivery: z.string({ required_error: "estimatedDelivery is required" }),
  }),
});

export const OrderValidation = {
  createOrderZodSchema,
};


