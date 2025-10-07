export type VehicleType = "Car" | "Bike" | "Auto";

export interface IRide {
  customerName?: string;
  pickup: string;
  destination: string;
  vehicleType: VehicleType;
  driverName: string;
  fare: number;
  estimatedArrival: string;
  createdAt?: Date;
}


