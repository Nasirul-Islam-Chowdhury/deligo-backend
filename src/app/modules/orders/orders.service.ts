import { Types } from "mongoose";
import { IOrder } from "./orders.interface";
import { Order } from "./orders.model";
import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";

const createOrder = async (payload: IOrder): Promise<IOrder> => {
  const created = await Order.create({
    ...payload,
    restaurantId: new Types.ObjectId(payload.restaurantId),
    userId: new Types.ObjectId(payload.userId),
  } as IOrder);
  return created.toObject();
};

const getOrderById = async (id: string): Promise<IOrder | null> => {
  const order = await Order.findById(id)
    .populate("restaurantId", "name address")
    .populate("userId", "name email")
    .lean();
  
  if (!order) {
    throw new ApiError(httpStatus.NOT_FOUND, "Order not found");
  }
  
  return order;
};

const getMyOrders = async (userId: string): Promise<IOrder[]> => {
  const orders = await Order.find({ 
    userId: new Types.ObjectId(userId),
    status: { $ne: "cancelled" }
  })
    .populate("restaurantId", "name address")
    .sort({ createdAt: -1 })
    .lean();
  
  return orders;
};

const cancelOrder = async (
  orderId: string, 
  userId: string
): Promise<IOrder | null> => {
  const order = await Order.findOne({
    _id: new Types.ObjectId(orderId),
    userId: new Types.ObjectId(userId),
  });

  if (!order) {
    throw new ApiError(httpStatus.NOT_FOUND, "Order not found");
  }

  if (order.status === "cancelled") {
    throw new ApiError(httpStatus.BAD_REQUEST, "Order is already cancelled");
  }

  if (order.status === "delivered") {
    throw new ApiError(
      httpStatus.BAD_REQUEST, 
      "Cannot cancel a delivered order"
    );
  }

  order.status = "cancelled";
  await order.save();

  return order.toObject();
};

export const OrderService = {
  createOrder,
  getOrderById,
  getMyOrders,
  cancelOrder,
};