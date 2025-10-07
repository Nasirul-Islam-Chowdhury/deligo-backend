import { IRestaurents } from './restaurents.interface';
import { User as RestaurentsModel } from './restaurents.model';
import { fileUploader } from '../../../helper/uploadImage';
import { IFile } from '../../../interfaces/file';

const createRestaurent = async (restaurentData: IRestaurents, files?: {
  restaurantImage?: Express.Multer.File[];
  menuImages?: Express.Multer.File[];
}): Promise<IRestaurents> => {
  let restaurantImageUrl = '';
  
  let processedMenu = restaurentData.menu || [];
  if (typeof restaurentData.menu === 'string') {
    try {
      processedMenu = JSON.parse(restaurentData.menu);
    } catch (error) {
      processedMenu = [];
    }
  }

  if (files?.restaurantImage && files.restaurantImage.length > 0) {
    const restaurantImageFile = files.restaurantImage[0] as IFile;
    try {
      const cloudinaryResult = await fileUploader.uploadToCloudinary(restaurantImageFile);
      if (cloudinaryResult) {
        restaurantImageUrl = cloudinaryResult.secure_url;
      }
    } catch (error) {
      console.log('Warning: Could not upload restaurant image:', error);
    }
  }

  if (files?.menuImages && files.menuImages.length > 0 && processedMenu.length > 0) {
    console.log(`Processing ${files.menuImages.length} menu images for ${processedMenu.length} menu items`);
    
    const menuWithImages = await Promise.all(
      processedMenu.map(async (menuItem, index) => {
        console.log(`Processing menu item ${index}: ${menuItem.name}`);
        
        if (files.menuImages && files.menuImages[index]) {
          const menuImageFile = files.menuImages[index] as IFile;
          console.log(`Uploading menu image for item ${index}: ${menuImageFile.originalname}`);
          
          try {
            const cloudinaryResult = await fileUploader.uploadToCloudinary(menuImageFile);
            if (cloudinaryResult) {
              console.log(`Successfully uploaded menu image for item ${index}: ${cloudinaryResult.secure_url}`);
              return {
                ...menuItem,
                image: cloudinaryResult.secure_url
              };
            }
          } catch (error) {
            console.log(`Warning: Could not upload menu image for item ${index}:`, error);
          }
        } else {
          console.log(`No menu image provided for item ${index}`);
        }
        return menuItem;
      })
    );
    processedMenu = menuWithImages;
  }

  // Create restaurant data with uploaded images
  const restaurantData = {
    ...restaurentData,
    image: restaurantImageUrl || restaurentData.image || '',
    menu: processedMenu
  };

  const createdRestaurent = await RestaurentsModel.create(restaurantData);
  return createdRestaurent.toObject();
};

const updateRestaurent = async (id: string, payload: Partial<IRestaurents>): Promise<IRestaurents | null> => {
  const updated = await RestaurentsModel.findByIdAndUpdate(id, payload, { new: true });
  return updated ? updated.toObject() : null;
};

const addMenuItem = async (id: string, item: { name: string; price: number; image?: string }): Promise<IRestaurents | null> => {
  const updated = await RestaurentsModel.findByIdAndUpdate(
    id,
    { $push: { menu: item } },
    { new: true }
  );
  return updated ? updated.toObject() : null;
};

const updateMenuItem = async (id: string, itemId: string, payload: { name?: string; price?: number; image?: string }): Promise<IRestaurents | null> => {
  const updated = await RestaurentsModel.findOneAndUpdate(
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
  const updated = await RestaurentsModel.findByIdAndUpdate(
    id,
    { $pull: { menu: { _id: itemId } } },
    { new: true }
  );
  return updated ? updated.toObject() : null;
};

export const RestaurentService = {
  createRestaurent,
  updateRestaurent,
  addMenuItem,
  updateMenuItem,
  deleteMenuItem,
};
