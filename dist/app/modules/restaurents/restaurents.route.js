"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.restaurentRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middleWares/validateRequest"));
const restaurents_controller_1 = require("./restaurents.controller");
const restaurents_validation_1 = require("./restaurents.validation");
const uploadImage_1 = require("../../../helper/uploadImage");
const router = express_1.default.Router();
router.post("/create-restaurent", uploadImage_1.fileUploader.upload.fields([
    { name: 'images', maxCount: 10 },
]), 
// auth(USER_ROLE.ADMIN),
// validateRequest(RestaurentValidation.createRestaurantZodSchema),
restaurents_controller_1.RestaurentController.createRestaurent);
router.get("/", restaurents_controller_1.RestaurentController.getAllRestaurents);
router.get("/:id", 
// auth(USER_ROLE.ADMIN, USER_ROLE.CUSTOMER),
restaurents_controller_1.RestaurentController.getSingleRestaurent);
router.patch("/:id", 
// auth(USER_ROLE.ADMIN),
(0, validateRequest_1.default)(restaurents_validation_1.RestaurentValidation.createRestaurantZodSchema.partial()), restaurents_controller_1.RestaurentController.updateRestaurent);
router.post("/:id/menu", 
// auth(USER_ROLE.ADMIN),
restaurents_controller_1.RestaurentController.addMenuItem);
router.patch("/:id/menu/:itemId", 
// auth(USER_ROLE.ADMIN),
restaurents_controller_1.RestaurentController.updateMenuItem);
router.delete("/:id/menu/:itemId", 
// auth(USER_ROLE.ADMIN),
restaurents_controller_1.RestaurentController.deleteMenuItem);
exports.restaurentRoutes = router;
