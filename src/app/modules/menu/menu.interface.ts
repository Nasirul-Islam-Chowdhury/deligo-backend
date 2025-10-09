import { Types } from "mongoose";

export type IMenu = {
    name: string;
    price: number;
    images: string[];
    restaurants?: Types.ObjectId;
    description?: string;
  };