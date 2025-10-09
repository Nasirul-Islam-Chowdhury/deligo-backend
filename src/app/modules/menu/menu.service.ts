import { IMenu } from "./menu.interface";
import { fileUploader } from "../../../helper/uploadImage";
import { IFile } from "../../../interfaces/file";
import { Menu } from "./menu.model";

const createMenu = async (
  menu: IMenu,
  files?: {
    images?: Express.Multer.File[];
  }
): Promise<IMenu> => {
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
    menu.images = imageUrls;
  }

  const res = await Menu.create(menu);
  return res;
};

const getAllMenus = async () => {
  const data = await Menu.find();
  return data;
};

const getSingleMenu = async (id: string): Promise<IMenu | null> => {
  const doc = await Menu.findById(id);
  return doc ? doc.toObject() : null;
};

const addMenuItem = async (
  id: string,
  item: { name: string; price: number; image?: string }
): Promise<IMenu | null> => {
  const updated = await Menu.findByIdAndUpdate(
    id,
    { $push: { menu: item } },
    { new: true }
  );
  return updated ? updated.toObject() : null;
};

const updateMenu = async (
  id: string,
  payload: Partial<IMenu>,
  files?: {
    images?: Express.Multer.File[];
  }
) => {
  console.log(payload, "-------> payload");

  // Find existing menu
  const existingMenu = await Menu.findById(id);
  if (!existingMenu) {
    throw new Error("Menu item not found");
  }

  // Handle image uploads if new images exist
  let newImageUrls: string[] = [];
  if (files?.images && files.images.length > 0) {
    for (const file of files.images) {
      const uploaded = await fileUploader.uploadToCloudinary(file);
      if (uploaded?.secure_url) {
        newImageUrls.push(uploaded.secure_url);
      }
    }
  }

  // Merge old and new images
  if (newImageUrls.length > 0) {
    existingMenu.images = [...existingMenu.images, ...newImageUrls];
  }

  // Update text fields
  if (payload.name) existingMenu.name = payload.name;
  if (payload.price) existingMenu.price = payload.price;
  if (payload.description)
    (existingMenu as any).description = payload.description;

  console.log(existingMenu, "-----> existingMenu");

  const updatedMenu = await existingMenu.save();
  return updatedMenu;
};

const deleteMenuItem = async (
  id: string,
  itemId: string
): Promise<IMenu | null> => {
  const updated = await Menu.findByIdAndUpdate(
    id,
    { $pull: { menu: { _id: itemId } } },
    { new: true }
  );
  return updated ? updated.toObject() : null;
};

export const MenuService = {
  createMenu,
  getSingleMenu,
  updateMenu,
  addMenuItem,
  deleteMenuItem,
  getAllMenus,
};
