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
exports.Order = void 0;
/* eslint-disable @typescript-eslint/no-this-alias */
const mongoose_1 = require("mongoose");
const OrderSchema = new mongoose_1.Schema({
    orderId: {
        type: String,
        unique: true
    },
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    customerName: { type: String, required: true },
    restaurantId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Restaurents",
        required: true
    },
    items: [
        {
            name: { type: String, required: true },
            price: { type: Number, required: true },
            quantity: { type: Number, required: true, default: 1 },
        },
    ],
    totalAmount: { type: Number, required: true },
    estimatedDelivery: { type: String, required: true },
    status: {
        type: String,
        enum: ["pending", "confirmed", "preparing", "delivered", "cancelled"],
        default: "pending",
    },
}, {
    timestamps: { createdAt: true, updatedAt: true },
    toJSON: {
        virtuals: true,
    },
});
OrderSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!this.orderId) {
            const timestamp = Date.now();
            const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
            this.orderId = `ORD-${timestamp}-${random}`;
        }
        next();
    });
});
exports.Order = (0, mongoose_1.model)("Order", OrderSchema);
