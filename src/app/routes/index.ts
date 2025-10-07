import express from 'express';
import { restaurentRoutes } from '../modules/restaurents/restaurents.route';


const router = express.Router();

const moduleRoutes = [
  
  {
    path: '/create-restaurent',
    route: restaurentRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
