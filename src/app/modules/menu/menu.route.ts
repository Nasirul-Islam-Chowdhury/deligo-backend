import express from "express";
import validateRequest from "../../middleWares/validateRequest";
import { MenuController } from "./menu.controller";
import { MenuValidation } from "./menu.validation";
import { fileUploader } from "../../../helper/uploadImage";

const router = express.Router();

router.post(
  "/",
  fileUploader.upload.fields([{ name: "images", maxCount: 10 }]),
  validateRequest(MenuValidation.createMenuZodSchema),
  MenuController.createMenu
);

router.patch("/:id",  fileUploader.upload.fields([{ name: "images", maxCount: 10 }]), MenuController.updateMenuItem);


router.get("/:id", MenuController.getSingleMenu);
router.get("/", MenuController.getAllMenus);

export const MenuRoutes = router;
