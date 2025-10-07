import { Request, Response } from "express";
import { RequestHandler } from "express-serve-static-core";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { RestaurentService } from "./restaurents.service";
import { IRestaurents } from "./restaurents.interface";


const createRestaurent: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await RestaurentService.createRestaurent(req.body);

    sendResponse<IRestaurents>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Restaurent created successfully!",
      data: result,
    });
  }
);

export const RestaurentController = {
  createRestaurent,
};
