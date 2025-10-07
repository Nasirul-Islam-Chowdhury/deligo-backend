/* eslint-disable @typescript-eslint/no-this-alias */
import { Schema, model } from "mongoose";
import { IRestaurents } from "./restaurents.interface";

const RestaurenntsSchema = new Schema<IRestaurents>(
  {
    name: String,
    cuisineType: String,
    image: String,
    deliveryTime: String,
    menu: [{ name: String, price: Number, image: String }],
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);


export const User = model<IRestaurents>("Restaurents", RestaurenntsSchema);
