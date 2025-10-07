import { IRestaurents } from './restaurents.interface';
import { User as RestaurentsModel } from './restaurents.model';

const createRestaurent = async (restaurentData: IRestaurents): Promise<IRestaurents> => {
  const createdRestaurent = await RestaurentsModel.create(restaurentData);
  return createdRestaurent.toObject();
};

export const RestaurentService = {
  createRestaurent,
};
