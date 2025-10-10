"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenuService = void 0;
const uploadImage_1 = require("../../../helper/uploadImage");
const menu_model_1 = require("./menu.model");
const createMenu = (menu, files) => __awaiter(void 0, void 0, void 0, function* () {
    const imageUrls = [];
    if ((files === null || files === void 0 ? void 0 : files.images) && files.images.length > 0) {
        for (const file of files.images) {
            const uploadedImage = yield uploadImage_1.fileUploader.uploadToCloudinary(file);
            if (uploadedImage === null || uploadedImage === void 0 ? void 0 : uploadedImage.secure_url) {
                imageUrls.push(uploadedImage.secure_url);
            }
        }
    }
    if (imageUrls.length > 0) {
        menu.images = imageUrls;
    }
    const res = yield menu_model_1.Menu.create(menu);
    return res;
});
const getAllMenus = () => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield menu_model_1.Menu.find();
    return data;
});
const getSingleMenu = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const doc = yield menu_model_1.Menu.findById(id);
    return doc ? doc.toObject() : null;
});
const addMenuItem = (id, item) => __awaiter(void 0, void 0, void 0, function* () {
    const updated = yield menu_model_1.Menu.findByIdAndUpdate(id, { $push: { menu: item } }, { new: true });
    return updated ? updated.toObject() : null;
});
const updateMenu = (id, payload, files) => __awaiter(void 0, void 0, void 0, function* () {
    // Find existing menu
    const existingMenu = yield menu_model_1.Menu.findById(id);
    if (!existingMenu) {
        throw new Error("Menu item not found");
    }
    // Handle image uploads if new images exist
    let newImageUrls = [];
    if ((files === null || files === void 0 ? void 0 : files.images) && files.images.length > 0) {
        for (const file of files.images) {
            const uploaded = yield uploadImage_1.fileUploader.uploadToCloudinary(file);
            if (uploaded === null || uploaded === void 0 ? void 0 : uploaded.secure_url) {
                newImageUrls.push(uploaded.secure_url);
            }
        }
    }
    // Merge old and new images
    if (newImageUrls.length > 0) {
        existingMenu.images = [...existingMenu.images, ...newImageUrls];
    }
    // Update text fields
    if (payload.name)
        existingMenu.name = payload.name;
    if (payload.price)
        existingMenu.price = payload.price;
    if (payload.description)
        existingMenu.description = payload.description;
    const updatedMenu = yield existingMenu.save();
    return updatedMenu;
});
const deleteMenuItem = (id, itemId) => __awaiter(void 0, void 0, void 0, function* () {
    const updated = yield menu_model_1.Menu.findByIdAndUpdate(id, { $pull: { menu: { _id: itemId } } }, { new: true });
    return updated ? updated.toObject() : null;
});
exports.MenuService = {
    createMenu,
    getSingleMenu,
    updateMenu,
    addMenuItem,
    deleteMenuItem,
    getAllMenus,
};
