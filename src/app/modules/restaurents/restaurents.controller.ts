import { Request, Response } from "express";
import { RequestHandler } from "express-serve-static-core";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { RestaurentService } from "./restaurents.service";
import { IRestaurents } from "./restaurents.interface";

const createRestaurent: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const files = req.files as {
      images?: Express.Multer.File[];
    };
    const result = await RestaurentService.createRestaurent(req.body, files);

    sendResponse<IRestaurents>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Restaurent created successfully!",
      data: result,
    });
  }
);

const getAllRestaurents: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await RestaurentService.getAllRestaurents();

    sendResponse<IRestaurents[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Restaurent retrieved successfully!",
      data: result,
    });
  }
);

const getSingleRestaurent: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await RestaurentService.getSingleRestaurent(id);

    sendResponse<IRestaurents | null>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Restaurent retrieved successfully!",
      data: result,
    });
  }
);

const updateRestaurent: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await RestaurentService.updateRestaurent(id, req.body);

    sendResponse<IRestaurents>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Restaurent updated successfully!",
      data: result,
    });
  }
);

const addMenuItem: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params; // restaurant id
    const result = await RestaurentService.addMenuItem(id, req.body);
    sendResponse<IRestaurents>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Menu item added successfully!",
      data: result,
    });
  }
);

const updateMenuItem: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { id, itemId } = req.params;
    const result = await RestaurentService.updateMenuItem(id, itemId, req.body);
    sendResponse<IRestaurents>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Menu item updated successfully!",
      data: result,
    });
  }
);

const deleteMenuItem: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { id, itemId } = req.params;
    const result = await RestaurentService.deleteMenuItem(id, itemId);
    sendResponse<IRestaurents>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Menu item removed successfully!",
      data: result,
    });
  }
);

export const RestaurentController = {
  createRestaurent,
  getSingleRestaurent,
  updateRestaurent,
  addMenuItem,
  updateMenuItem,
  deleteMenuItem,
  getAllRestaurents
};
