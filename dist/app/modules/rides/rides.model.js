"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ride = void 0;
const mongoose_1 = require("mongoose");
const RideSchema = new mongoose_1.Schema({
    customerId: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    customerName: { type: String },
    pickup: { type: String, required: true },
    destination: { type: String, required: true },
    vehicleType: { type: String, enum: ["Car", "Bike", "Auto"], required: true },
    driverName: { type: String, required: true },
    fare: { type: Number, required: true },
    estimatedArrival: { type: String, required: true },
}, {
    timestamps: { createdAt: true, updatedAt: false },
    toJSON: { virtuals: true },
});
exports.Ride = (0, mongoose_1.model)("Ride", RideSchema);
