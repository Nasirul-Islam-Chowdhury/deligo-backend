"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rideRoutes = void 0;
const express_1 = __importDefault(require("express"));
const rides_controller_1 = require("./rides.controller");
const auth_1 = __importDefault(require("../../middleWares/auth"));
const user_1 = require("../../../enums/user");
const router = express_1.default.Router();
router.post("/", 
// validateRequest(RideValidation.createRideZodSchema),
(0, auth_1.default)(user_1.USER_ROLE.CUSTOMER), rides_controller_1.RideController.createRide);
router.get("/:id", rides_controller_1.RideController.getRide);
exports.rideRoutes = router;
