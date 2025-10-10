import express from "express";
import validateRequest from "../../middleWares/validateRequest";
import { RideController } from "./rides.controller";
import { RideValidation } from "./rides.validation";
import auth from "../../middleWares/auth";
import { USER_ROLE } from "../../../enums/user";

const router = express.Router();

router.post(
  "/",
  // validateRequest(RideValidation.createRideZodSchema),
  auth(USER_ROLE.CUSTOMER),
  RideController.createRide
);

router.get("/my-rides", auth(USER_ROLE.CUSTOMER), RideController.getMyBookedRides);


router.get(
  "/:id",
  RideController.getRide
);

export const rideRoutes = router;


