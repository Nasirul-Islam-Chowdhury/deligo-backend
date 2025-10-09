"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Menu = exports.MenuSchema = void 0;
/* eslint-disable @typescript-eslint/no-this-alias */
const mongoose_1 = require("mongoose");
exports.MenuSchema = new mongoose_1.Schema({
    name: String,
    price: Number,
    images: [String],
    description: String,
    restaurants: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Restaurant",
            required: true,
        }],
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.Menu = (0, mongoose_1.model)("Menu", exports.MenuSchema);
