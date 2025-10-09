import { Types } from "mongoose";

export interface IRide {
  _id?: string;
  customerId: Types.ObjectId;
  customerName?: string;
  pickup: string;
  destination: string;
  vehicleType: "Car" | "Bike" | "Auto";
  driverName: string;
  fare: number;
  estimatedArrival: string;
  createdAt?: Date;
}
