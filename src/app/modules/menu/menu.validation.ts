import { z } from "zod";

const menuItemSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: "Menu item name is required",
    }),
    price: z.preprocess(
      (val) => {
        if (typeof val === "string" || typeof val === "number") {
          const num = Number(val);
          return isNaN(num) ? val : num;
        }
        return val;
      },
      z
        .number({
          required_error: "Price is required",
        })
        .positive("Price must be a positive number")
    ),
    images: z.array(z.string()).optional(),
    description: z.string().optional(),
  }),
});

export const MenuValidation = {
  createMenuZodSchema: menuItemSchema,
};
