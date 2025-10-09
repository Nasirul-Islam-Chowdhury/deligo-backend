import { z } from "zod";

const vehicleTypeEnum = z.enum(["Car", "Bike", "Auto"]);

const createRideZodSchema = z.object({
  body: z.object({
    customerName: z.string().optional(),
    pickup: z.string({ required_error: "pickup is required" }),
    destination: z.string({ required_error: "destination is required" }),
    vehicleType: vehicleTypeEnum,
    driverName: z.string({ required_error: "driverName is required" }).optional(),
    fare: z.number({ required_error: "fare is required" }).optional(),
    estimatedArrival: z.string({ required_error: "estimatedArrival is required" }).optional(),
  }),
});

export const RideValidation = {
  createRideZodSchema,
};
