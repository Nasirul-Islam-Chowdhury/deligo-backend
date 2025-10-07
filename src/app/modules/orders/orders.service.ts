import { Types } from "mongoose";
import { IOrder } from "./orders.interface";
import { Order } from "./orders.model";

const createOrder = async (payload: IOrder): Promise<IOrder> => {
  const created = await Order.create({
    ...payload,
    restaurantId: new Types.ObjectId(payload.restaurantId),
  } as IOrder);
  return created.toObject();
};

const getOrderById = async (id: string): Promise<IOrder | null> => {
  return await Order.findById(id).lean();
};

export const OrderService = {
  createOrder,
  getOrderById,
};


