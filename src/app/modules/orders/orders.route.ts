import express from "express";
import validateRequest from "../../middleWares/validateRequest";
import auth from "../../middleWares/auth";
import { OrderController } from "./orders.controller";
import { OrderValidation } from "./orders.validation";
import { USER_ROLE } from "../../../enums/user";

const router = express.Router();

router.post(
  "/",
  auth(USER_ROLE.CUSTOMER),
  validateRequest(OrderValidation.createOrderZodSchema),
  OrderController.createOrder
);

router.get("/my-orders", auth(USER_ROLE.CUSTOMER), OrderController.getMyOrders);

router.get("/:id", OrderController.getOrder);

router.patch(
  "/:id/cancel",
  auth(USER_ROLE.CUSTOMER),
  OrderController.cancelOrder
);

export const orderRoutes = router;
