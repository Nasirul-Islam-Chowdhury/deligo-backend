import { Request, Response } from "express";
import { RequestHandler } from "express-serve-static-core";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { MenuService } from "./menu.service";
import { IMenu } from "./menu.interface";

const createMenu: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const files = req.files as {
      images?: Express.Multer.File[];
    };


    const result = await MenuService.createMenu(req.body, files);

    sendResponse<IMenu>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Menu created successfully!",
      data: result,
    });
  }
);

const getAllMenus: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await MenuService.getAllMenus();

    sendResponse<IMenu[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Restaurent retrieved successfully!",
      data: result,
    });
  }
);

const getSingleMenu: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await MenuService.getSingleMenu(id);

    sendResponse<IMenu | null>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Restaurent retrieved successfully!",
      data: result,
    });
  }
);

const updateMenu: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await MenuService.updateMenu(id, req.body);

    sendResponse<IMenu>(res, {
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
    const result = await MenuService.addMenuItem(id, req.body);
    sendResponse<IMenu>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Menu item added successfully!",
      data: result,
    });
  }
);

const updateMenuItem: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
console.log(req, "-----_> rew")
    const result = await MenuService.updateMenu(id, req.body, req.files as { images?: Express.Multer.File[] });
    sendResponse<IMenu>(res, {
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
    const result = await MenuService.deleteMenuItem(id, itemId);
    sendResponse<IMenu>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Menu item removed successfully!",
      data: result,
    });
  }
);



export const MenuController = {
  createMenu,
  getAllMenus,
  getSingleMenu,
  updateMenu,
  addMenuItem,
  updateMenuItem,
  deleteMenuItem,
  
};
