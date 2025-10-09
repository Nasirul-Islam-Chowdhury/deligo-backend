/* eslint-disable @typescript-eslint/no-this-alias */
import mongoose, { Schema, model } from "mongoose";
import { IRestaurents } from "./restaurents.interface";

const RestaurentsSchema = new Schema<IRestaurents>(
  {
    name: String,
    cuisineType: String,
    images: [String],
    deliveryTime: String,
    menus: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Menu'
    }],
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

// Virtual for getting menu count
RestaurentsSchema.virtual('menuCount').get(function() {
  return this?.menus?.length ;
});

// Method to populate menus
RestaurentsSchema.methods.getMenusWithDetails = async function() {
  await this.populate('menus');
  return this.menus;
};


export const Restaurents = model<IRestaurents>("Restaurents", RestaurentsSchema);
