  /* eslint-disable @typescript-eslint/no-this-alias */
  import { Schema, model } from "mongoose";
  import { IMenu } from "./menu.interface";

  export const MenuSchema = new Schema<IMenu>(
    {
      name: String,
      price: Number,
      images: [String],
      description: String,
      restaurants: [{
        type: Schema.Types.ObjectId,
        ref: "Restaurant",
        required: true,
      }],
    },
    {
      timestamps: true,
      toJSON: {
        virtuals: true,
      },
    }
  );

  export const Menu = model<IMenu>("Menu", MenuSchema);
