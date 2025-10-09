import express from 'express';
import { restaurentRoutes } from '../modules/restaurents/restaurents.route';
import { rideRoutes } from '../modules/rides/rides.route';
import { orderRoutes } from '../modules/orders/orders.route';
import { userRoutes } from '../modules/users/user.route';
import { AuthRoutes } from '../modules/auth/auth.route';
import { MenuRoutes } from '../modules/menu/menu.route';


const router = express.Router();

const moduleRoutes = [
  
  {
    path: '/menu',
    route: MenuRoutes,
  },
  {
    path: '/restaurents',
    route: restaurentRoutes,
  },
  {
    path: '/users',
    route: userRoutes,
  },
  {
    path: '/rides',
    route: rideRoutes,
  },
  {
    path: '/orders',
    route: orderRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
