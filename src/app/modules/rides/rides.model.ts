import { Schema, model, Types } from "mongoose";
import { IRide } from "./rides.interface";

const RideSchema = new Schema<IRide>(
  {
    customerId: { type: Schema.Types.ObjectId, ref: "User", required: true }, 
    customerName: { type: String },
    pickup: { type: String, required: true },
    destination: { type: String, required: true },
    vehicleType: { type: String, enum: ["Car", "Bike", "Auto"], required: true },
    driverName: { type: String, required: true },
    fare: { type: Number, required: true },
    estimatedArrival: { type: String, required: true },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
    toJSON: { virtuals: true },
  }
);

export const Ride = model<IRide>("Ride", RideSchema);
