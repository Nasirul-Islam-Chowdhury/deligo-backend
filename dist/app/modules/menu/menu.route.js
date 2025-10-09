"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenuRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middleWares/validateRequest"));
const menu_controller_1 = require("./menu.controller");
const menu_validation_1 = require("./menu.validation");
const uploadImage_1 = require("../../../helper/uploadImage");
const router = express_1.default.Router();
router.post("/", uploadImage_1.fileUploader.upload.fields([{ name: "images", maxCount: 10 }]), (0, validateRequest_1.default)(menu_validation_1.MenuValidation.createMenuZodSchema), menu_controller_1.MenuController.createMenu);
router.patch("/:id", uploadImage_1.fileUploader.upload.fields([{ name: "images", maxCount: 10 }]), menu_controller_1.MenuController.updateMenuItem);
router.get("/:id", menu_controller_1.MenuController.getSingleMenu);
router.get("/", menu_controller_1.MenuController.getAllMenus);
exports.MenuRoutes = router;
