import express from 'express';
import validateRequest from '../../middleWares/validateRequest';
import { UserController } from './user.controller';
import { UserValidation } from './user.validation';
import auth from '../../middleWares/auth';
import { USER_ROLE } from '../../../enums/user';
const router = express.Router();

router.post(
  '/create-user',
  validateRequest(UserValidation.createUserZodSchema),
  UserController.createUser,
);

router.post(
  '/create-admin',
  auth(USER_ROLE.ADMIN),
  validateRequest(UserValidation.createAdminZodSchema),
  UserController.createAdmin,
);

export const userRoutes = router;
