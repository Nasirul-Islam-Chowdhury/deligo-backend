import express from 'express';
import { restaurentRoutes } from '../modules/restaurents/restaurents.route';
import { rideRoutes } from '../modules/rides/rides.route';


const router = express.Router();

const moduleRoutes = [
  
  {
    path: '/restaurents',
    route: restaurentRoutes,
  },
  {
    path: '/rides',
    route: rideRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
