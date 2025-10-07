import express from "express";
import validateRequest from "../../middleWares/validateRequest";
import { RestaurentController } from "./restaurents.controller";
import { RestaurentValidation } from "./restaurents.validation";
import { fileUploader } from "../../../helper/uploadImage";

const router = express.Router();

router.post(
  "/create-restaurent",
  fileUploader.upload.fields([
    { name: 'restaurantImage', maxCount: 1 },
    { name: 'menuImages', maxCount: 10 }
  ]),
  validateRequest(RestaurentValidation.createRestaurentZodSchema),
  RestaurentController.createRestaurent
);

export const restaurentRoutes = router;
