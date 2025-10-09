import { Types } from "mongoose";

export interface IOrderItem {
  name: string;
  price: number;
  quantity: number;
}

export interface IOrder {
  _id?: Types.ObjectId;
  orderId?: string;
  userId: Types.ObjectId | string;
  customerName: string;
  restaurantId: Types.ObjectId | string;
  items: IOrderItem[];
  totalAmount: number;
  estimatedDelivery: string;
  status: "pending" | "confirmed" | "preparing" | "delivered" | "cancelled";
  createdAt?: Date;
  updatedAt?: Date;
}