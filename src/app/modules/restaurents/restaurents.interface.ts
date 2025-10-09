import { IMenu } from "../menu/menu.interface";


export type IRestaurents = {
  name: string;
  cuisineType: string;
  deliveryTime: string;
  images: string[];
  menus?: IMenu[];
};
