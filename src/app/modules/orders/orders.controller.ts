import { Request, Response } from "express";
import httpStatus from "http-status";
import { OrderService } from "./orders.service";
import { IOrder } from "./orders.interface";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";

const createOrder = catchAsync(async (req: Request, res: Response) => {
  const orderData = req.body;
  const userId = req.user?.userId; 
  
  const result = await OrderService.createOrder({
    ...orderData,
    userId,
  });

  sendResponse<IOrder>(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Order created successfully",
    data: result,
  });
});

const getOrder = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  
  const result = await OrderService.getOrderById(id);

  sendResponse<IOrder>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Order retrieved successfully",
    data: result,
  });
});

const getMyOrders = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user?.userId; // Assuming auth middleware sets user info
  
  const result = await OrderService.getMyOrders(userId);

  sendResponse<IOrder[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Orders retrieved successfully",
    data: result,
  });
});

const cancelOrder = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = req.user?.userId; // Assuming auth middleware sets user info
  
  const result = await OrderService.cancelOrder(id, userId);

  sendResponse<IOrder>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Order cancelled successfully",
    data: result,
  });
});

export const OrderController = {
  createOrder,
  getOrder,
  getMyOrders,
  cancelOrder,
};