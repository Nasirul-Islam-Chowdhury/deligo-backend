"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const restaurents_route_1 = require("../modules/restaurents/restaurents.route");
const rides_route_1 = require("../modules/rides/rides.route");
const orders_route_1 = require("../modules/orders/orders.route");
const user_route_1 = require("../modules/users/user.route");
const auth_route_1 = require("../modules/auth/auth.route");
const menu_route_1 = require("../modules/menu/menu.route");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: '/menu',
        route: menu_route_1.MenuRoutes,
    },
    {
        path: '/restaurents',
        route: restaurents_route_1.restaurentRoutes,
    },
    {
        path: '/users',
        route: user_route_1.userRoutes,
    },
    {
        path: '/rides',
        route: rides_route_1.rideRoutes,
    },
    {
        path: '/orders',
        route: orders_route_1.orderRoutes,
    },
    {
        path: '/auth',
        route: auth_route_1.AuthRoutes,
    },
];
moduleRoutes.forEach(route => router.use(route.path, route.route));
exports.default = router;
