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
exports.RideService = void 0;
const rides_model_1 = require("./rides.model");
const mongoose_1 = require("mongoose");
const createRide = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    if (!payload.driverName) {
        const randomDrivers = ["Rahim", "Karim", "Sajid", "Nafis"];
        payload.driverName = randomDrivers[Math.floor(Math.random() * randomDrivers.length)];
    }
    if (!payload.fare) {
        payload.fare = Math.floor(Math.random() * (500 - 100 + 1)) + 100;
    }
    if (!payload.estimatedArrival) {
        payload.estimatedArrival = "IN 10 MIN";
    }
    const created = yield rides_model_1.Ride.create(payload);
    return created.toObject();
});
const getRideById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield rides_model_1.Ride.findById(id).lean();
});
// ✅ New service
const getMyBookedRides = (customerId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield rides_model_1.Ride.find({ customerId: new mongoose_1.Types.ObjectId(customerId) })
        .sort({ createdAt: -1 })
        .lean();
});
exports.RideService = {
    createRide,
    getRideById,
    getMyBookedRides,
};
