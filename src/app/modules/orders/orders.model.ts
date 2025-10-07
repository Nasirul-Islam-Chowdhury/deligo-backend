/* eslint-disable @typescript-eslint/no-this-alias */
import { Schema, model, Types } from "mongoose";
import { IOrder } from "./orders.interface";

const OrderSchema = new Schema<IOrder>(
  {
    userId: {type: Schema.Types.ObjectId},
    customerName: { type: String },
    restaurantId: { type: Schema.Types.ObjectId, ref: "Restaurents", required: true },
    items: [
      {
        name: { type: String, required: true },
        price: { type: Number, required: true },
      },
    ],
    totalAmount: { type: Number, required: true },
    estimatedDelivery: { type: String, required: true },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
    toJSON: {
      virtuals: true,
    },
  }
);

export const Order = model<IOrder>("Order", OrderSchema);


