import { IRestaurents } from './restaurents.interface';
import { Restaurents } from './restaurents.model';
import { fileUploader } from '../../../helper/uploadImage';

const createRestaurent = async (restaurentData: IRestaurents, files?: {
  images?: Express.Multer.File[];

}): Promise<IRestaurents> => {


  const imageUrls: string[] = []; 
  
  if (files?.images && files.images.length > 0) {

    for (const file of files.images) {
      const uploadedImage = await fileUploader.uploadToCloudinary(file);
      
      if (uploadedImage?.secure_url) {
        imageUrls.push(uploadedImage.secure_url); 
      }
    }
  }


  if (imageUrls.length > 0) {
    restaurentData.images = imageUrls; 
  }

  if (typeof restaurentData.menus === 'string') {
    restaurentData.menus = JSON.parse(restaurentData.menus);
  }

const createdRestaurent = await Restaurents.create(restaurentData);

// Populate menus before returning
await createdRestaurent.populate('menus');

return createdRestaurent.toObject();
};


const getAllRestaurents = async ()=>{
  const data = await Restaurents.find().populate("menus");
  return data;
}



const getSingleRestaurent = async (id: string): Promise<IRestaurents | null> => {
  const doc = await Restaurents.findById(id).populate("menus");
  return doc ? doc.toObject() : null;
};

const updateRestaurent = async (id: string, payload: Partial<IRestaurents>): Promise<IRestaurents | null> => {
  const updated = await Restaurents.findByIdAndUpdate(id, payload, { new: true });
  return updated ? updated.toObject() : null;
};

const addMenuItem = async (id: string, item: { name: string; price: number; image?: string }): Promise<IRestaurents | null> => {
  const updated = await Restaurents.findByIdAndUpdate(
    id,
    { $push: { menu: item } },
    { new: true }
  );
  return updated ? updated.toObject() : null;
};

const updateMenuItem = async (id: string, itemId: string, payload: { name?: string; price?: number; image?: string }): Promise<IRestaurents | null> => {
  const updated = await Restaurents.findOneAndUpdate(
    { _id: id, 'menu._id': itemId },
    {
      $set: {
        'menu.$.name': payload.name,
        'menu.$.price': payload.price,
        'menu.$.image': payload.image,
      },
    },
    { new: true }
  );
  return updated ? updated.toObject() : null;
};

const deleteMenuItem = async (id: string, itemId: string): Promise<IRestaurents | null> => {
  const updated = await Restaurents.findByIdAndUpdate(
    id,
    { $pull: { menu: { _id: itemId } } },
    { new: true }
  );
  return updated ? updated.toObject() : null;
};

export const RestaurentService = {
  createRestaurent,
  getSingleRestaurent,
  updateRestaurent,
  addMenuItem,
  updateMenuItem,
  deleteMenuItem,
  getAllRestaurents
};
