import express from "express";
import validateRequest from "../../middleWares/validateRequest";
import { OrderController } from "./orders.controller";
import { OrderValidation } from "./orders.validation";

const router = express.Router();

router.post(
  "/",
  validateRequest(OrderValidation.createOrderZodSchema),
  OrderController.createOrder
);

router.get(
  "/:id",
  OrderController.getOrder
);

export const orderRoutes = router;


