/* eslint-disable @typescript-eslint/no-this-alias */
import { Schema, model } from "mongoose";
import { IOrder } from "./orders.interface";

const OrderSchema = new Schema<IOrder>(
  {
    orderId: { 
      type: String, 
      unique: true 
    },
    userId: { 
      type: Schema.Types.ObjectId, 
      ref: "User", 
      required: true 
    },
    customerName: { type: String, required: true },
    restaurantId: { 
      type: Schema.Types.ObjectId, 
      ref: "Restaurents", 
      required: true 
    },
    items: [
      {
        name: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true, default: 1 },
      },
    ],
    totalAmount: { type: Number, required: true },
    estimatedDelivery: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "confirmed", "preparing", "delivered", "cancelled"],
      default: "pending",
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: true },
    toJSON: {
      virtuals: true,
    },
  }
);

OrderSchema.pre("save", async function (next) {
  if (!this.orderId) {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    this.orderId = `ORD-${timestamp}-${random}`;
  }
  next();
});

export const Order = model<IOrder>("Order", OrderSchema);