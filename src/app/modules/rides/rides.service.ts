import { IRide } from "./rides.interface";
import { Ride } from "./rides.model";
import { Types } from "mongoose";

const createRide = async (payload: IRide): Promise<IRide> => {

  if (!payload.driverName) {
    const randomDrivers = ["Rahim", "Karim", "Sajid", "Nafis"];
    payload.driverName = randomDrivers[Math.floor(Math.random() * randomDrivers.length)];
  }

  if (!payload.fare) {
    payload.fare = Math.floor(Math.random() * (500 - 100 + 1)) + 100; 
  }

  if (!payload.estimatedArrival) {
    payload.estimatedArrival = "IN 10 MIN";
  }

  const created = await Ride.create(payload);
  return created.toObject();
};

const getRideById = async (id: string): Promise<IRide | null> => {
  return await Ride.findById(id).lean();
};

// ✅ New service
const getMyBookedRides = async (customerId: string): Promise<IRide[]> => {
  return await Ride.find({ customerId: new Types.ObjectId(customerId) })
    .sort({ createdAt: -1 })
    .lean();
};

export const RideService = {
  createRide,
  getRideById,
  getMyBookedRides,
};
