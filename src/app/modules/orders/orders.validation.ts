import { z } from "zod";

const createOrderZodSchema = z.object({
  body: z.object({
    customerName: z.string({
      required_error: "Customer name is required",
    }),
    restaurantId: z.string({
      required_error: "Restaurant ID is required",
    }),
    items: z.array(
      z.object({
        name: z.string({
          required_error: "Item name is required",
        }),
        price: z.number({
          required_error: "Item price is required",
        }).positive("Price must be positive"),
        quantity: z.number({
          required_error: "Item quantity is required",
        }).int().positive("Quantity must be a positive integer").default(1),
      })
    ).min(1, "At least one item is required"),
    totalAmount: z.number({
      required_error: "Total amount is required",
    }).positive("Total amount must be positive"),
    estimatedDelivery: z.string({
      required_error: "Estimated delivery is required",
    }),
  }),
});

export const OrderValidation = {
  createOrderZodSchema,
};