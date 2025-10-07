import { IRide } from "./rides.interface";
import { Ride } from "./rides.model";

const createRide = async (payload: IRide): Promise<IRide> => {
  const created = await Ride.create(payload);
  return created.toObject();
};

const getRideById = async (id: string): Promise<IRide | null> => {
  return await Ride.findById(id).lean();
};

export const RideService = {
  createRide,
  getRideById,
};


