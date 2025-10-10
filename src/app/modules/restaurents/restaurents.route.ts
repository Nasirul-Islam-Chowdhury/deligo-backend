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
    { name: 'images', maxCount: 10 },
  ]),
  auth(USER_ROLE.ADMIN),
  // validateRequest(RestaurentValidation.createRestaurantZodSchema),
  RestaurentController.createRestaurent
);

router.get(
  "/",

  RestaurentController.getAllRestaurents
);

router.get(
  "/:id",
  auth(USER_ROLE.ADMIN, USER_ROLE.CUSTOMER),
  RestaurentController.getSingleRestaurent
);

router.patch(
  "/:id",
  auth(USER_ROLE.ADMIN),
  validateRequest(RestaurentValidation.createRestaurantZodSchema.partial()),
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
