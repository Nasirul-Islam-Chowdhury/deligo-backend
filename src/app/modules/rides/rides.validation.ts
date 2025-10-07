import { z } from "zod";

const vehicleTypeEnum = z.enum(["Car", "Bike", "Auto"]);

const createRideZodSchema = z.object({
  body: z.object({
    customerName: z.string().optional(),
    pickup: z.string({ required_error: "pickup is required" }),
    destination: z.string({ required_error: "destination is required" }),
    vehicleType: vehicleTypeEnum,
    driverName: z.string({ required_error: "driverName is required" }),
    fare: z.number({ required_error: "fare is required" }),
    estimatedArrival: z.string({ required_error: "estimatedArrival is required" }),
  }),
});

export const RideValidation = {
  createRideZodSchema,
};


