import { Request, Response } from "express";
import { RequestHandler } from "express-serve-static-core";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { IRide } from "./rides.interface";
import { RideService } from "./rides.service";

const createRide: RequestHandler = catchAsync(async (req: Request, res: Response) => {
  const user = req.user; 

  const result = await RideService.createRide({ ...req.body, customerId: user!.userId });

  sendResponse<IRide>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Ride booked successfully!",
    data: result,
  });
});

const getRide: RequestHandler = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params as { id: string };
  const result = await RideService.getRideById(id);

  sendResponse<IRide | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Ride retrieved successfully!",
    data: result,
  });
});

const getMyBookedRides: RequestHandler = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;

  const result = await RideService.getMyBookedRides(user!.userId);

  sendResponse<IRide[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "My booked rides retrieved successfully!",
    data: result,
  });
});

export const RideController = {
  createRide,
  getRide,
  getMyBookedRides,
};
