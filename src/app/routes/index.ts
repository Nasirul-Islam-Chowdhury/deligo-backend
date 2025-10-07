import express from 'express';
import { restaurentRoutes } from '../modules/restaurents/restaurents.route';
import { rideRoutes } from '../modules/rides/rides.route';
import { orderRoutes } from '../modules/orders/orders.route';
import { userRoutes } from '../modules/users/user.route';


const router = express.Router();

const moduleRoutes = [
  
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
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
