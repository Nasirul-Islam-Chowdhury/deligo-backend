import express from "express";
import validateRequest from "../../middleWares/validateRequest";
import { RestaurentController } from "./restaurents.controller";
import { RestaurentValidation } from "./restaurents.validation";
const router = express.Router();

router.post(
  "/create-restaurent",
  validateRequest(RestaurentValidation.createRestaurentZodSchema),
  RestaurentController.createRestaurent
);

export const restaurentRoutes = router;
