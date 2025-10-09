"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RideValidation = void 0;
const zod_1 = require("zod");
const vehicleTypeEnum = zod_1.z.enum(["Car", "Bike", "Auto"]);
const createRideZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        customerName: zod_1.z.string().optional(),
        pickup: zod_1.z.string({ required_error: "pickup is required" }),
        destination: zod_1.z.string({ required_error: "destination is required" }),
        vehicleType: vehicleTypeEnum,
        driverName: zod_1.z.string({ required_error: "driverName is required" }).optional(),
        fare: zod_1.z.number({ required_error: "fare is required" }).optional(),
        estimatedArrival: zod_1.z.string({ required_error: "estimatedArrival is required" }).optional(),
    }),
});
exports.RideValidation = {
    createRideZodSchema,
};
