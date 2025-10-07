import { Request, Response } from "express";
import { RequestHandler } from "express-serve-static-core";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { IOrder } from "./orders.interface";
import { OrderService } from "./orders.service";

const createOrder: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await OrderService.createOrder(req.body);

    sendResponse<IOrder>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Order created successfully!",
      data: result,
    });
  }
);

const getOrder: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params as { id: string };
    const result = await OrderService.getOrderById(id);

    sendResponse<IOrder | null>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Order retrieved successfully!",
      data: result,
    });
  }
);

export const OrderController = {
  createOrder,
  getOrder,
};


