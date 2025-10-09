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
exports.RestaurentService = void 0;
const restaurents_model_1 = require("./restaurents.model");
const uploadImage_1 = require("../../../helper/uploadImage");
const createRestaurent = (restaurentData, files) => __awaiter(void 0, void 0, void 0, function* () {
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
        restaurentData.images = imageUrls;
    }
    if (typeof restaurentData.menus === 'string') {
        restaurentData.menus = JSON.parse(restaurentData.menus);
    }
    const createdRestaurent = yield restaurents_model_1.Restaurents.create(restaurentData);
    // Populate menus before returning
    yield createdRestaurent.populate('menus');
    return createdRestaurent.toObject();
});
const getAllRestaurents = () => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield restaurents_model_1.Restaurents.find().populate("menus");
    return data;
});
const getSingleRestaurent = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const doc = yield restaurents_model_1.Restaurents.findById(id).populate("menus");
    return doc ? doc.toObject() : null;
});
const updateRestaurent = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const updated = yield restaurents_model_1.Restaurents.findByIdAndUpdate(id, payload, { new: true });
    return updated ? updated.toObject() : null;
});
const addMenuItem = (id, item) => __awaiter(void 0, void 0, void 0, function* () {
    const updated = yield restaurents_model_1.Restaurents.findByIdAndUpdate(id, { $push: { menu: item } }, { new: true });
    return updated ? updated.toObject() : null;
});
const updateMenuItem = (id, itemId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const updated = yield restaurents_model_1.Restaurents.findOneAndUpdate({ _id: id, 'menu._id': itemId }, {
        $set: {
            'menu.$.name': payload.name,
            'menu.$.price': payload.price,
            'menu.$.image': payload.image,
        },
    }, { new: true });
    return updated ? updated.toObject() : null;
});
const deleteMenuItem = (id, itemId) => __awaiter(void 0, void 0, void 0, function* () {
    const updated = yield restaurents_model_1.Restaurents.findByIdAndUpdate(id, { $pull: { menu: { _id: itemId } } }, { new: true });
    return updated ? updated.toObject() : null;
});
exports.RestaurentService = {
    createRestaurent,
    getSingleRestaurent,
    updateRestaurent,
    addMenuItem,
    updateMenuItem,
    deleteMenuItem,
    getAllRestaurents
};
