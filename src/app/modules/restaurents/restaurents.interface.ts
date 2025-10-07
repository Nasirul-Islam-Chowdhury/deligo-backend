
export type IMenu = {
  name: string;
  price: number;
  image: string;
};


export type IRestaurents = {
  name: string;
  cuisineType: string;
  deliveryTime: string;
  menu: IMenu[];
  image: string;
};
