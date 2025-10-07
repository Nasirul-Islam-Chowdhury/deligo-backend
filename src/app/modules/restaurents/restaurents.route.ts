import express from "express";
import validateRequest from "../../middleWares/validateRequest";
import { RestaurentController } from "./restaurents.controller";
import { RestaurentValidation } from "./restaurents.validation";
import { fileUploader } from "../../../helper/uploadImage";
import auth from "../../middleWares/auth";
import { USER_ROLE } from "../../../enums/user";

const router = express.Router();

router.post(
  "/create-restaurent",
  fileUploader.upload.fields([
    { name: 'restaurantImage', maxCount: 1 },
    { name: 'menuImages', maxCount: 10 }
  ]),
  auth(USER_ROLE.ADMIN),
  validateRequest(RestaurentValidation.createRestaurentZodSchema),
  RestaurentController.createRestaurent
);

router.patch(
  "/:id",
  auth(USER_ROLE.ADMIN),
  validateRequest(RestaurentValidation.createRestaurentZodSchema.partial()),
  RestaurentController.updateRestaurent
);

router.post(
  "/:id/menu",
  auth(USER_ROLE.ADMIN),
  RestaurentController.addMenuItem
);

router.patch(
  "/:id/menu/:itemId",
  auth(USER_ROLE.ADMIN),
  RestaurentController.updateMenuItem
);

router.delete(
  "/:id/menu/:itemId",
  auth(USER_ROLE.ADMIN),
  RestaurentController.deleteMenuItem
);

export const restaurentRoutes = router;
