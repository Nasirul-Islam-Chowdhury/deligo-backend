import express from "express";
import validateRequest from "../../middleWares/validateRequest";
import { RideController } from "./rides.controller";
import { RideValidation } from "./rides.validation";

const router = express.Router();

router.post(
  "/",
  validateRequest(RideValidation.createRideZodSchema),
  RideController.createRide
);

router.get(
  "/:id",
  RideController.getRide
);

export const rideRoutes = router;


