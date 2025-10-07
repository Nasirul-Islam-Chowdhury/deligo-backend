import { Schema, Types } from "mongoose";

export interface IOrderItem {
  name: string;
  price: number;
}

export interface IOrder {
  userId: Schema.Types.ObjectId;
  customerName?: string;
  restaurantId: Types.ObjectId;
  items: IOrderItem[];
  totalAmount: number;
  estimatedDelivery: string;
  createdAt?: Date;
}


